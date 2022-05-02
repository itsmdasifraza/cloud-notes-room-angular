import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
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
export class MainHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  app : { name : string } = environment.app;  
  
  ngOnInit(): void {}

  notes(){
    this.router.navigate(['/']);
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
