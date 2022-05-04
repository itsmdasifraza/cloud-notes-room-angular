import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FooterModule } from '../../navigator/footer/footer.module';
// import { MainHeaderModule } from '../../navigator/main-header/main-header.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    // MainHeaderModule,
    // FooterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class LoginModule { }
