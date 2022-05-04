import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { UserService } from 'src/app/user/services/user/user.service';

@Component({
  selector: 'app-force-login',
  templateUrl: './force-login.component.html',
  styleUrls: ['./force-login.component.css']
})
export class ForceLoginComponent implements OnInit {

  
  location = window.location.href;
  constructor(private connectService: ConnectService , private userService : UserService,private route: ActivatedRoute,  private router: Router,  private titleService: Title, private meta : Meta) { 
    this.titleService.setTitle("Force Login");
    this.meta.updateTag({ name: 'description', content: `Force Login.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
  }
  error = "";
  user;
  spinner =  true;
  ngOnInit(): void {
  
    this.route.params.subscribe(routeParams => {
      localStorage.setItem("user-token",routeParams.token);
      this.userService.readUser().subscribe(res => {
        if (res) {
          this.user = res.info;
          // console.log(this.user);
          this.connectService.userRefresh.next(this.user);
          this.spinner =  false;
          this.router.navigate(['/chat']);
        }
      }, err => {
        if (err) {
          // console.log("err", err);
          this.spinner =  false;
          if(err.error.mssg == "access denied - unauthorized"){
            localStorage.removeItem("user-token");
            this.error = "Invalid or expired force login link";
          }else{
            this.router.navigate(['/chat']);
          }
        }
      });
    });
  }


}
