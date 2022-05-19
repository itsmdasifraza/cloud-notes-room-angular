import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  backendIp = environment.backend.ip;
  connection = environment.backend.connection;

  private deleteListApi = `${this.connection}://${this.backendIp}/api/list/delete`;
  private createListApi = `${this.connection}://${this.backendIp}/api/list/create`;
  private readNoteListApi = `${this.connection}://${this.backendIp}/api/list/read`;

  constructor(private http: HttpClient) { }

  readNoteList(username : string, slug : string) {
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readNoteListApi}/${username}/${slug}`,{headers:header} );
  }

  deleteList(noteid,listid) {
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.deleteListApi}/${noteid}/${listid}`,{headers:header} );
  }
   createList(noteid, list){
    let header= new HttpHeaders({
      "Content-Type":"application/json",
      "token":localStorage.getItem("user-token")
    });
    return this.http.post<any>(`${this.createListApi}/${noteid}`,list,{headers:header});
  }

}
