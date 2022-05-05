import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthRegLoginService } from 'src/app/user/services/auth/auth-reg-login.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  location : string = window.location.href;
  app : { name : string } = environment.app;
  developer : { name : string, position : string, email : string} = environment.developer;

  constructor(private authService : AuthRegLoginService, private router : Router, private titleService: Title, private meta : Meta) {
    this.titleService.setTitle(`Register | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `type username, email and password.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
   }

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(36) , this.userVal.bind(this)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), this.userPassVal.bind(this)]),

  });

  ngOnInit(): void {}
  
  success = false;
  error = false;
  spinner : boolean = false;
  
  register(){
    if(this.registerForm.valid){
      this.spinner = true;
      this.error = false;
      this.success = false;
        // console.log(this.registerForm.value);
        
        let user = {
          "username" : this.registerForm.value.username,
          "email" : this.registerForm.value.email,
          "password" : this.registerForm.value.password
        }
        
        this.authService.register(user).subscribe(
          (res)=>{
            // console.log("res",res);
    
            this.spinner = false;
            this.registerForm.reset();
            this.router.navigate(["/login"]);
            // this.success  = res.mssg;

          },(err)=>{
            // console.log("err",err);
            this.spinner = false;
            this.error = err.error.mssg;
        });
    }
  }
  userVal(control:FormControl) {
    let regUser=/^[a-zA-Z0-9._]+$/;
    if(!regUser.test(control.value)){
      return { 'usernameSyntaxInvalid': true };
    }
    return null;
  }
  userPassVal(control:FormControl) {
    let regUser=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!regUser.test(control.value)){
      return { '[passwordSyntaxInvalid': true };
    }
    return null;
  }
}
