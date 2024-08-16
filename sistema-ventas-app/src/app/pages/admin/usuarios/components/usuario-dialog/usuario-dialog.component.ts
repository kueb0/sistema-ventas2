import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject } from 'rxjs';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrl: './usuario-dialog.component.scss'
})
export class UsuarioDialogComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject <any>();
  titleButton = "Guardar";
  actionTODO = Action.NEW;
  userForm = this.fb.group({
    cveUsuario: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    rol: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public baseForm: BaseForm){}

  ngOnInit(): void{
    this.pathData();
  }

  pathData() {
    if(this.data.user.cveUsuario){
      //Actualizar
      this.titleButton = "Actualizar";
      this.actionTODO = Action.EDIT;
    } else {
      //Insert
      this.titleButton = "Guardar";
      this.actionTODO = Action.NEW;
    }
  }

  onSave() {
    if (this.userForm.invalid) return;

    var formValue = this.userForm.getRawValue();

    if (this.actionTODO == Action.NEW){
      //Insert
      var { confirmPassword, ...newUser} = formValue;
      console.log("Insert", newUser);
    } else {
      //Actualización
      var { confirmPassword, password, username, ...updateUser } = formValue;
      console.log("Update", updateUser);
    }
  }

  ngOnDestroy():void{
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
