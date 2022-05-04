import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { UserService } from 'src/app/user/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private toggleSubscription: Subscription;
  settingToggle = true;
  constructor(private userService : UserService , private connectService : ConnectService, private router : Router) {
    this.toggleSubscription = this.connectService.settingToggle.subscribe(res => {
      this.settingToggle = res;
    });
   }
  username;
  user;
  userSubscription : Subscription;
  ngOnInit(): void {
    this.userSubscription = this.connectService.userRefresh.subscribe(res => {
      if (res) {
        // console.log("res",res);
        this.user = res;
        this.username = this.user.username;
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
  }
  add(){
    this.router.navigate(["/chat/create"]);
  }

  visible() {
    return {
      'dnone': !this.settingToggle,
    }
  }
  ngOnDestroy(){
    this.toggleSubscription.unsubscribe();
  }
}
