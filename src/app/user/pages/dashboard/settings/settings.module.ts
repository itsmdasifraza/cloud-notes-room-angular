import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DefaultSettingScreenComponent } from './default-setting-screen/default-setting-screen.component';
import { UpdateAvatarComponent } from './update-avatar/update-avatar.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';


@NgModule({
  declarations: [SettingsComponent, UpdateAvatarComponent, UpdateDetailsComponent, UpdatePasswordComponent, DefaultSettingScreenComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    SharedModule
  ]
})
export class SettingsModule { }
