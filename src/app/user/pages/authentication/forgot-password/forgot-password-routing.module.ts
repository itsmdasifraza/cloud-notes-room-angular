import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForceLoginComponent } from './force-login/force-login.component';
import { ForgotPasswordComponent } from './forgot-password.component';


const routes: Routes = [
  { path: '' , 'component' : ForgotPasswordComponent},
  { path: 'force/login/:token' , 'component' :ForceLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
