import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../../../../shared/models/usuario.interface';
import { Rol } from '../../../../../shared/models/rol.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();
  titleButton = "Guardar";
  actionTODO = Action.NEW;
  roles: Rol[] = [];
  userForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UsuarioDialogComponent>,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private usuarioSvc: UsuariosService
  ) {
    this.userForm = this.fb.group({
      cveUsuario: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      cveRol: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { 
      validator: this.checkPasswords 
    });
  }

  ngOnInit(): void {
    this.usuarioSvc.listarRoles().pipe(takeUntil(this.destroy$)).subscribe((roles: Rol[]) => {
      this.roles = roles;
      this.pathData();
    });
  }

  pathData() {
    if (this.data.user.cveUsuario) {
      this.userForm.patchValue({
        cveUsuario: this.data?.user.cveUsuario,
        nombre: this.data?.user.nombre,
        apellidos: this.data?.user.apellidos,
        username: this.data?.user.username,
        cveRol: this.data?.user.cveRol,
      });

      this.userForm.get("username")?.disable();

      // Eliminar las validaciones password, confirmPassword
      this.userForm.get("password")?.setValidators(null);
      this.userForm.get("password")?.setErrors(null);
      this.userForm.get("confirmPassword")?.setValidators(null);
      this.userForm.get("confirmPassword")?.setErrors(null);

      this.userForm.updateValueAndValidity();

      // Actualizar
      this.titleButton = "Actualizar";
      this.actionTODO = Action.EDIT;
    } else {
      // Insert
      this.titleButton = "Guardar";
      this.actionTODO = Action.NEW;
    }
  }

  onSave() {
    if (this.userForm.invalid) return;

    var formValue = this.userForm.getRawValue();

    if (this.actionTODO == Action.NEW) {
      // Insert
      var newUser: Usuario = {
        nombre: formValue.nombre!,
        apellidos: formValue.apellidos!,
        username: formValue.username!,
        password: formValue.password!,
        cveRol: parseInt(formValue.cveRol!)
      };
      this.usuarioSvc.insertarUsuario(newUser)
        .pipe(takeUntil(this.destroy$)).subscribe((data: Usuario) => {
          this.dialogRef.close(data);
        });
    } else {
      // Actualización
      var updateUser: Usuario = {
        cveUsuario: parseInt(formValue.cveUsuario!),
        nombre: formValue.nombre!,
        apellidos: formValue.apellidos!,
        cveRol: parseInt(formValue.cveRol!)
      };
      this.usuarioSvc.actualizarUsuario(updateUser)
        .pipe(takeUntil(this.destroy$)).subscribe((data: Usuario) => {
          this.dialogRef.close(data);
        });
    }
  }

  onClear(): void {
    if (this.actionTODO === Action.NEW) {
      this.userForm.reset(); // Limpia todos los campos en modo nuevo
    } else {
      // En modo de edición, solo limpia los campos de nombre y apellidos
      this.userForm.patchValue({
        nombre: '',
        apellidos: ''
      });
    }
  }

  checkPasswords(group: FormGroup): { notSame: boolean } | null {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
