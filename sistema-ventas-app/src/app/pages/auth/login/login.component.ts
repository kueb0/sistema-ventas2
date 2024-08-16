import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm } from '../../../shared/utils/base-form';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
//import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private destroy$ = new Subject<any>();


  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });
  
  constructor(private fb: FormBuilder, public baseForm: BaseForm, private authSvc: AuthService) { }

  ngOnInit(): void { }

  onLogin(){
    //Verificar que el formulario sea correcto
    if (this.loginForm.invalid) return;

    //Mostrar el spinner
    //this.spinner.show();

    //Obtener la información del formulario y almacenarla en una variable llamada 'form'
    const form = this.loginForm.value;

    //Ejecutar el servicio para obtener los datos.
    this.authSvc.login(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
