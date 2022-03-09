import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../../core/auth/components/login/login.component';
import { ForgotPasswordComponent } from '../../core/auth/components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from '../../core/auth/components/new-password/new-password.component';
import {ConfirmAccountComponent} from '../../core/auth/components/confirm-account/confirm-account.component';
import {SharedFormModule} from "../../shared-form/shared-form.module";



@NgModule({
  imports: [
    CommonModule,
    SharedFormModule
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ConfirmAccountComponent
  ],
  providers: [] // Should this be used or global?
})
export class AuthModule { }
