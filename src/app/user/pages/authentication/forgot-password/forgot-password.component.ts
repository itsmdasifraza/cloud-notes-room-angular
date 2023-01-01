import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ForgotPasswordService } from 'src/app/user/services/forgot-password/forgot-password.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  location : string = window.location.href;
  app : { name : string } = environment.app;
  developer : { name : string, position : string, email : string} = environment.developer;
  
  constructor(private forgotPasswordService : ForgotPasswordService, private titleService: Title, private meta : Meta) { 
    this.titleService.setTitle(`Forgot Password | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `type email.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }

  forgotPasswordForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

  });

  ngOnInit(): void {
  }
  success : string;
  error : string;
  spinner : boolean = false;
  
  forgotPassword(){
    if(this.forgotPasswordForm.valid){

      this.spinner = true;
      this.error = undefined;
      this.success = undefined;
        // console.log(this.forgotPasswordForm.value);
        let email = {
          "email" : this.forgotPasswordForm.value.email,
        } 
        
        this.forgotPasswordService.forgot(email).subscribe(
          (res)=>{
            // console.log("res",res);
            this.spinner = false;
            this.forgotPasswordForm.reset();
            this.success  = "Force login link sent on your email";
          },(err)=>{
            // console.log("err",err);
            this.spinner = false;
            this.error = "Email not registered or not verified";
        });
    }
  }


}
