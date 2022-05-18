import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultSettingScreenComponent } from './default-setting-screen/default-setting-screen.component';
import { UpdateAvatarComponent } from './update-avatar/update-avatar.component';
import { SettingsComponent } from './settings.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';


const routes: Routes = [
  {
    path : '' , 'component' : SettingsComponent,
    children:[
      { path: '', 'component' : DefaultSettingScreenComponent },
      { path: 'icons', 'component' : UpdateAvatarComponent},
      { path: 'details', 'component' : UpdateDetailsComponent},
      { path: 'password', 'component' : UpdatePasswordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
