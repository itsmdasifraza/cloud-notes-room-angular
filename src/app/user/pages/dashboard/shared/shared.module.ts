import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from './user-header/user-header.component';
import { RouterModule } from '@angular/router';
import { TopHeaderComponent } from './top-header/top-header.component';



@NgModule({
  declarations: [ UserHeaderComponent, TopHeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
  ,exports :[
    TopHeaderComponent, UserHeaderComponent
  ]
})
export class SharedModule { }
