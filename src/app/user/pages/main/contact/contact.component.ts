import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  location : string = window.location.href;
  app : { name : string } = environment.app;
  developer : { name : string, position : string, email : string} = environment.developer;

  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle(`Contact | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `${this.developer.name}
    Email: ${this.developer.email}
    If you have any questions, suggestions or other requests feel free to contact me! I am always happy to hear from you!` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }

  ngOnInit(): void {}

}
