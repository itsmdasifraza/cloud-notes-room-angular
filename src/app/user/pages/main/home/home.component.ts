import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Meta, Title} from "@angular/platform-browser";
import { Router } from '@angular/router';
import { AuthRegLoginService } from 'src/app/user/services/auth/auth-reg-login.service';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  location : string = window.location.href;
  app : { name : string } = environment.app;
  developer : { name : string, position : string, email : string} = environment.developer;
  
  constructor(private titleService:Title, private meta: Meta, private connectService: ConnectService, private authService : AuthRegLoginService, private router : Router) {
    this.titleService.setTitle(`${this.app.name} | Where the World Store Notes Private or Public`);
    this.meta.updateTag({ name: 'description', content: `Millions of users build, push, and maintain their notes on ${this.app.name} — the largest and most advanced Notes Sharing platform in the world. Connect to see your friends notes.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
   }

  loginForm = new FormGroup({
    usermail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),

  });

  
  ngOnInit(): void {}

  error = false;
  spinner : boolean = false;
  
  login(){
    if(this.loginForm.valid){
      this.spinner = true;
      this.error = false;
        // console.log(this.loginForm.value);
        let user = {
          "usermail" : this.loginForm.value.usermail,
         "password" : this.loginForm.value.password
        } 
        
        this.authService.login(user).subscribe(
          (res)=>{
            // console.log("res",res);
            localStorage.setItem("user-token",res.token);
            this.connectService.userRefresh.next(res.data);
            this.spinner = false;
            this.loginForm.reset();
            this.router.navigate(["/chat"]);

          },(err)=>{
            // console.log("err",err);
            this.spinner = false;
            this.error = err.error.mssg;
        });
    }
  }
  

}
