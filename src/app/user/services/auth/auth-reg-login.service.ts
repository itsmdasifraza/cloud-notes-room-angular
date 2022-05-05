import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthRegLoginService {
  backendIp = environment.backend.ip;
  connection = environment.backend.connection;

  registerApi = `${this.connection}://${this.backendIp}/api/auth/register`;
  loginApi = `${this.connection}://${this.backendIp}/api/auth/login`;
  
  constructor(private http : HttpClient) { }

  register(user){
    return this.http.post<any>(`${this.registerApi}`,user );
  }

  login(user){
    return this.http.post<any>(`${this.loginApi}`,user);
  }
}
