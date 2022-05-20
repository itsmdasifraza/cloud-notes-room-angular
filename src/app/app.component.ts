import { Component } from '@angular/core';
import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';
import { Router, RouterOutlet } from '@angular/router';
import { ConnectService } from './user/services/connect/connect.service';
import { UserService } from './user/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('anim', [
      transition('* => *', [
        query(':enter', [style({ position: 'relative', opacity: '0.2' }), animate('.5s ease-in-out', style({ opacity: '1' }))], {
          optional: true,
        }),
      ])
    ])]
})
export class AppComponent {

  constructor(private connectService: ConnectService, private userService: UserService, private router: Router) { }
  user : {about : string, address : string, avatar : string, college : string, education : string, email : string, name : string, phone : string, timestamp : string, verified : boolean, __v : number, _id : string};
  ngOnInit(): void {
    let token = localStorage.getItem("user-token");
    if(token) this.readUser();
  }

  // Fetches user Details using token => userid
  readUser(){
    this.userService.readUser().subscribe(res => {
      if (res) {
        this.user = res.info;
        this.connectService.userRefresh.next(this.user);
      }
    }, err => {
      if (err && err.error.mssg == "access denied - unauthorized") {  
          localStorage.removeItem("user-token");
      }
    });
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
