import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { CreateComponent } from './route/create/create.component';
import { ReadComponent } from './route/read/read.component';
import { HomeComponent } from './route/home/home.component';
import { UpdateComponent } from './route/update/update.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ NotesComponent, CreateComponent, ReadComponent, HomeComponent, UpdateComponent, NotesListComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    Ng2SearchPipeModule ,
    RouterModule,
    SharedModule
  ]
})
export class NotesModule { }
