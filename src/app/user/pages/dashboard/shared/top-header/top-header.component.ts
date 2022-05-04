import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css'],
  animations: [
    trigger('mobileNav', [
      // ...
      state('invisible', style({
        opacity: 1
      })),
      state('visible', style({
        left:0,
        opacity: 1
      })),
      transition('invisible => visible', [
        animate('0.2s ease-in-out')
      ]),
      transition('visible => invisible', [
        animate('0.2s ease-in-out')
      ]),
      
    ]),
    trigger('mobileBlackBackground', [
      // ...
      state('invisible', style({
        opacity: 1
      })),
      state('visible', style({
        position:' fixed',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor: 'rgb(0,0,0,0.6)',
        zIndex: 998
      })),
      transition('invisible <=> visible', [
        animate('0s ease-in-out')
      ]),
      
    ]),
  ]
})
export class TopHeaderComponent implements OnInit {

  constructor(private router: Router, private connectService : ConnectService) { }
  @Input() username;
  app : { name : string } = environment.app;
  
  ngOnInit(): void {}

  logout(){
    // console.log("clicked");
    this.connectService.chatRefresh.next([]);
    this.connectService.userRefresh.next(null);
    localStorage.removeItem("user-token");
    this.router.navigate(["/"]);
  }
  headerDetail : boolean  = true; 
  tglState = true;
  scroll = true;
  toggle() {
    this.tglState = !this.tglState;
    if(this.scroll ){
      document.body.style.overflowY = "hidden";
    }
    if(!this.scroll){
      document.body.style.overflowY = "unset";
    }
    this.scroll = !this.scroll;
  }

}
