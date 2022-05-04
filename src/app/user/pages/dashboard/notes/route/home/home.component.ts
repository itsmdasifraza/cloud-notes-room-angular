import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  location : string = window.location.href;
  app : { name : string } = environment.app;
  
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle(`Notes | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Your chats will display here.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
  }
  ngOnInit(): void {
  }

}
