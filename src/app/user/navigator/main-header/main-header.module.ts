import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../pages/dashboard/shared/shared.module';



@NgModule({
  declarations: [
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [MainHeaderComponent]
})
export class MainHeaderModule { }
