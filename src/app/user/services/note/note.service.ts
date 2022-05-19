import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  backendIp = environment.backend.ip;
  connection = environment.backend.connection;

  private createNoteApi =  `${this.connection}://${this.backendIp}/api/note/create`;
  private readNoteApi =  `${this.connection}://${this.backendIp}/api/note/read`;
  private readPublicNoteApi =  `${this.connection}://${this.backendIp}/api/note/read/public`;
  private deleteNoteApi =  `${this.connection}://${this.backendIp}/api/note/delete`;
  private editNoteApi =  `${this.connection}://${this.backendIp}/api/note/edit`;

  constructor(private http: HttpClient) { }

  createNote(note) {
    let header= new HttpHeaders({
      "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(this.createNoteApi, note, {headers:header} );
  }

  editNote(note,noteid) {
    let header= new HttpHeaders({
      "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(`${this.editNoteApi}/${noteid}`, note,{headers:header} );
  }

  readAllNote(){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readNoteApi}`,{headers:header});
  }

  readPublicNote(username : string){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readPublicNoteApi}/${username}`);
  }
  
  readSingleNote(slug : string){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readNoteApi}/${slug}`,{headers:header});
  }

  deleteNote(noteid){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.deleteNoteApi}/${noteid}`,{headers:header});
  }
}
