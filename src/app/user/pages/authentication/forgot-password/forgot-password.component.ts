import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ForgotPasswordService } from 'src/app/user/services/forgot-password/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  location = window.location.href;
  constructor(private forgotPasswordService : ForgotPasswordService, private titleService: Title, private meta : Meta) { 
    this.titleService.setTitle("Forgot Password");
    this.meta.updateTag({ name: 'description', content: `type email.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

  });

  ngOnInit(): void {
  }
  success = false;
  error = false;
  spinner : boolean = false;
  
  forgotPassword(){
    if(this.forgotPasswordForm.valid){

      this.spinner = true;
      this.error = false;
      this.success = false;
        // console.log(this.forgotPasswordForm.value);
        let email = {
          "email" : this.forgotPasswordForm.value.email,
        } 
        
        this.forgotPasswordService.forgot(email).subscribe(
          (res)=>{
            // console.log("res",res);
            this.spinner = false;
            this.forgotPasswordForm.reset();
            this.success  = res.mssg;
          },(err)=>{
            // console.log("err",err);
            this.spinner = false;
            this.error = err.error.mssg;
        });
    }
  }


}
