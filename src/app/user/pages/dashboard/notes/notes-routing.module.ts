import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes.component';
import { CreateComponent } from './route/create/create.component';
import { HomeComponent } from './route/home/home.component';
import { ReadComponent } from './route/read/read.component';
import { UpdateComponent } from './route/update/update.component';


const routes: Routes = [
  { path: '', component : NotesComponent,
  children:[
    { path: 'all', component : HomeComponent},
    { path: 'create', component : CreateComponent},
    { path: ':chatid', component : ReadComponent},
    { path: ':chatid/update', component : UpdateComponent},
  
  ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
