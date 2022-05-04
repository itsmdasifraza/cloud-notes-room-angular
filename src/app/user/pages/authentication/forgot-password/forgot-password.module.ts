import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForceLoginComponent } from './force-login/force-login.component';


@NgModule({
  declarations: [ForgotPasswordComponent, ForceLoginComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ForgotPasswordModule { }
