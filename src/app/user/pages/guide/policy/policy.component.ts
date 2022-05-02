import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})

export class PolicyComponent implements OnInit {

  location : string = window.location.href;
  app : { name : string } = environment.app;
  developer : { name : string, position : string, email : string} = environment.developer;
  
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle(`Policy | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Accountability for content
    The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this context, please note that we are accordingly not obliged to monitor merely the transmitted.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  
  }
  ngOnInit(): void {}
}
