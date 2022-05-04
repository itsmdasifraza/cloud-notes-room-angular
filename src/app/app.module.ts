import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MainHeaderModule } from './user/navigator/main-header/main-header.module';
import { FooterModule } from './user/navigator/footer/footer.module';
import { NotesModule } from './user/pages/dashboard/notes/notes.module';
import { SettingsModule } from './user/pages/dashboard/settings/settings.module';
import { SharedModule } from './user/pages/dashboard/shared/shared.module';
import { ProfileModule } from './user/pages/dashboard/profile/profile.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainHeaderModule,
    FooterModule,
    HttpClientModule,
    NotesModule,
    SettingsModule,
    SharedModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
