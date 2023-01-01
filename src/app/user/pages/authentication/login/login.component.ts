import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthRegLoginService } from 'src/app/user/services/auth/auth-reg-login.service';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  location : string = window.location.href;
  app : { name : string } = environment.app;
  developer : { name : string, position : string, email : string} = environment.developer;

  constructor(private connectService: ConnectService, private authService : AuthRegLoginService, private router : Router, private titleService: Title, private meta : Meta) { 
    this.titleService.setTitle(`Login | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `type username or email and password.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }

  loginForm = new UntypedFormGroup({
    usermail: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),

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
            this.router.navigate(["/notes/all"]);

          },(err)=>{
            // console.log("err",err);
            this.spinner = false;
            this.error = err.error.mssg;
        });
    }
  }

}
