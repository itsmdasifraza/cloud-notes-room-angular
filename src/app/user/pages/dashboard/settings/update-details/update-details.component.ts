import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { ProfileService } from 'src/app/user/services/profile/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {
  location = window.location.href;
  app : { name : string } = environment.app;
  constructor(private connectService : ConnectService ,private route: ActivatedRoute, private fb: UntypedFormBuilder, private router: Router, private profileService: ProfileService,private titleService:Title, private meta: Meta) { 
    this.connectService.settingToggle.next(false);
    this.titleService.setTitle(`Details | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Change user info.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
  }
  userData;

  changeProfileForm = this.fb.group({
    name: new UntypedFormControl('', []),
    phone: new UntypedFormControl('', []),
    address: new UntypedFormControl('', []),
    college: new UntypedFormControl('', []),
    education: new UntypedFormControl('', []),
    about: new UntypedFormControl('', []),
  });
  spinner: Boolean = false;
  ngOnInit(): void {
 
    this.connectService.userRefresh.subscribe(res => {
      if (res) {
        // console.log("res", res);
        this.userData = res;
        this.changeProfileForm.setValue({
          name: this.userData.name,
          phone: this.userData.phone,
          address: this.userData.address,
          college: this.userData.college,
          education: this.userData.education,
          about: this.userData.about,
        });
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
  }

  changeProfile() {
    if (this.changeProfileForm.valid) {
      // console.log(this.changeProfileForm.value);
      this.profileService.updatePersonalInfo(this.changeProfileForm.value).subscribe(
        (res) => {
          // console.log("res", res);
          this.connectService.userRefresh.next(res.data);
          this.router.navigate(["/settings"]);

        }, (err) => {
          // console.log("err", err);
        });
    }
  }
  ngOnDestroy(): void {
    this.connectService.settingToggle.next(true);
}

}