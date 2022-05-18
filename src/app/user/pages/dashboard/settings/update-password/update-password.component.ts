import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { ProfileService } from 'src/app/user/services/profile/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  location = window.location.href;
  app : { name : string } = environment.app;
  constructor(private connectService: ConnectService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private profileService: ProfileService,private titleService:Title, private meta: Meta) {
    this.connectService.settingToggle.next(false);
    this.titleService.setTitle(`Password | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Change user password.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
   }
  userData;

  changePasswordForm = this.fb.group({
    newpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit(): void {
   
  }
  spinner: Boolean = false;
  changePassword() {
    if (this.changePasswordForm.valid) {
      // console.log(this.changeProfileForm.value);
      this.profileService.updatePasswordInfo(this.changePasswordForm.value).subscribe(
        (res) => {
          // console.log("res", res);
          this.connectService.chatRefresh.next([]);
          this.connectService.userRefresh.next(null);
          localStorage.removeItem("user-token");
          this.router.navigate(["/"]);

        }, (err) => {
          // console.log("err", err);
        });
    }
  }

  ngOnDestroy(): void {
    this.connectService.settingToggle.next(true);
  }
}
