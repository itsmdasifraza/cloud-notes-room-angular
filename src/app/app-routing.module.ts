import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from './user/guard/authorized/authorized.guard';
import { UnauthorizedGuard } from './user/guard/unauthorized/unauthorized.guard';

const routes: Routes = [
  { path: '', canActivate: [UnauthorizedGuard],  loadChildren: () => import('./user/pages/main/home/home.module').then(m => m.HomeModule)},
  { path: 'contact', canActivate: [UnauthorizedGuard],  loadChildren: () => import('./user/pages/main/contact/contact.module').then(m => m.ContactModule)},
  { path: 'about', canActivate: [UnauthorizedGuard],  loadChildren: () => import('./user/pages/main/about/about.module').then(m => m.AboutModule)},
  { path: 'privacy-policy', canActivate: [UnauthorizedGuard],  loadChildren: () => import('./user/pages/guide/policy/policy.module').then(m => m.PolicyModule)},
  // { path: 'chat', canActivate: [AuthorizedGuard] , loadChildren: () => import('./user/pages/chat/read-chat/read-chat.module').then(m => m.ReadChatModule)},

  
  { path: 'register', canActivate: [UnauthorizedGuard] , loadChildren: () => import('./user/pages/authentication/register/register.module').then(m => m.RegisterModule)},
  { path: 'login', canActivate: [UnauthorizedGuard] , loadChildren: () => import('./user/pages/authentication/login/login.module').then(m => m.LoginModule)},
  { path: 'forgot-password', canActivate: [UnauthorizedGuard] , loadChildren: () => import('./user/pages/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)},
  // { path: 'settingsdfrf' , canActivate: [AuthorizedGuard], loadChildren: () => import('./user/pages/user/setting/setting.module').then(m => m.SettingModule)},
  { path: 'settings' , canActivate: [AuthorizedGuard], loadChildren: () => import('./user/pages/dashboard/settings/settings.module').then(m => m.SettingsModule)},
  
  
  { path: 'verify' , loadChildren: () => import('./user/pages/user/verify/verify.module').then(m => m.VerifyModule)},


  // { path: ':username' , loadChildren: () => import('./user/pages/user/profile/profile.module').then(m => m.ProfileModule)},  
  { path: ':username' , loadChildren: () => import('./user/pages/dashboard/profile/profile.module').then(m => m.ProfileModule)},  
 

  { path: 'notes', canActivate: [AuthorizedGuard] , loadChildren: () => import('./user/pages/dashboard/notes/notes.module').then(m => m.NotesModule)},
 
  { path: ':username', canActivate: [AuthorizedGuard] , loadChildren: () => import('./user/pages/dashboard/notes/notes.module').then(m => m.NotesModule)},
 


  { path: '**', loadChildren: () => import('./user/pages/404/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
