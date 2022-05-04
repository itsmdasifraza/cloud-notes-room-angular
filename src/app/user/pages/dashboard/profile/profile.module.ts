import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PublicChatComponent } from './public-chat/public-chat.component';


@NgModule({
  declarations: [ProfileComponent, PublicChatComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    SharedModule
  ]
})
export class ProfileModule { }
