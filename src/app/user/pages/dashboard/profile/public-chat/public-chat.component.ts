import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.css']
})
export class PublicChatComponent implements OnInit {

  constructor() { }
  @Input() publicChat;
  @Input() username;
  ngOnInit(): void {
  }

}
