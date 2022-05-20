import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendIp = environment.backend.ip;
  connection = environment.backend.connection;

  private readUserApi = `${this.connection}://${this.backendIp}/api/user/read`;
 
  constructor(private http: HttpClient) { }

   readUser(){
    let header= new HttpHeaders({
      // "Content-Type":"application/json",
      "token": localStorage.getItem("user-token")
    });
    return this.http.get<any>(`${this.readUserApi}`,{headers:header});
  }
 
  
}
