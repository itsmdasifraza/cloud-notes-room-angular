import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { ProfileService } from 'src/app/user/services/profile/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.css']
})
export class UpdateAvatarComponent implements OnInit {
  location = window.location.href;
  app : { name : string } = environment.app;
  constructor(private connectService : ConnectService ,private route: ActivatedRoute,private fb: UntypedFormBuilder,private router: Router , private profileService : ProfileService , private titleService:Title, private meta: Meta) { 
    this.connectService.settingToggle.next(false);
    this.titleService.setTitle(`Icons | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Change user icon.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }
  avatar = ["user0","user1", "user4","user5","user2" , "user6", "user7", "user3","user8", "user9"];
  userData;
  changeAvatarForm = this.fb.group({ 
    user_icon: new UntypedFormControl('', [Validators.required]),
  });
  spinner: Boolean = false;
  ngOnInit(): void {
  
  this.connectService.userRefresh.subscribe(res => {
        if (res) {
          // console.log("res",res);
          this.userData = res;
          this.changeAvatarForm.setValue({
            user_icon : this.userData.avatar
          });
        }
      }, err => {
        if (err) {
          // console.log("err", err);
        }
      });
    
  }
  changeAvatar(){
    if(this.changeAvatarForm.valid){

        // console.log(this.changeAvatarForm.value);
        let avatar = {
          "avatar" : this.changeAvatarForm.value.user_icon
        } 
        
        this.profileService.updateProfileAvatar(avatar).subscribe(
          (res)=>{
            // console.log("res",res);
            this.connectService.userRefresh.next(res.data);
            this.router.navigate(["/settings"]);

          },(err)=>{
            // console.log("err",err);
        });
    }
  }
  ngOnDestroy(): void {
    this.connectService.settingToggle.next(true);
}
}
