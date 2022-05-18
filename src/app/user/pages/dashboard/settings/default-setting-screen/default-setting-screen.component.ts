import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-default-setting-screen',
  templateUrl: './default-setting-screen.component.html',
  styleUrls: ['./default-setting-screen.component.css']
})
export class DefaultSettingScreenComponent implements OnInit {

  location = window.location.href;
  app : { name : string } = environment.app;
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle(`Settings | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Manage your account.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
  }
  ngOnInit(): void {
  }

}
