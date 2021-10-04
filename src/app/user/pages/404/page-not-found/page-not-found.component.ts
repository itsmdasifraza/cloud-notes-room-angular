import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  location = window.location.href;
  constructor(private titleService:Title, private meta: Meta) {
    this.titleService.setTitle("Page Not Found");
    this.meta.updateTag({ name: 'description', content: `Page doesn't exist.

    Try pressing the back button or click home button.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
  }

  ngOnInit(): void {
  }

}
