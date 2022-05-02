import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  location : string = window.location.href;
  app : { name : string } = environment.app;
  developer : { name : string, position : string, email : string} = environment.developer;

  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle(`About | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Tech stack,
    MongoDB | Express | Angular | NodeJS
    User password encryption,
    Bcrypt | Hash | Salt
    Validation,
    Express validator | Angular validator
    Database connectivity,
    Mongoose
    Programming languages,
    Typescript | Javascript
    Styling component,
    Bootstrap
    Animations,
    Animate.css | Angular animation
    Developer,
    ${this.developer.name} | ${this.developer.position}
    ${this.developer.email}.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }
  ngOnInit(): void {}

}
