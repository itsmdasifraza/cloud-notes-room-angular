import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  @Input() user;
  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  add() {
    this.router.navigate(["/chat/create"]);
  }

}
