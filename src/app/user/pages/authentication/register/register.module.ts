import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from 'src/app/user/navigator/footer/footer.module';
import { MainHeaderModule } from 'src/app/user/navigator/main-header/main-header.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MainHeaderModule,
    FooterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class RegisterModule { }
