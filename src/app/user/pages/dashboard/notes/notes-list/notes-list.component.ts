import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { NoteService } from 'src/app/user/services/note/note.service';
import { UserService } from 'src/app/user/services/user/user.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  private chatSubscription: Subscription;
  private userSubscription: Subscription;
  private toggleSubscription: Subscription;
  list;
  user;
  username;
  private refreshSubscription : Subscription;
  chatToggle = true;
  searchText: string;
  constructor(private connectService: ConnectService,private userService: UserService, private noteService: NoteService, private router: Router) {

    this.refreshSubscription = this.connectService.chatRefresh.subscribe(res => {
        if(res){
          if(res.length > 0){

            this.list = res;
          }
        }
    });

    this.toggleSubscription = this.connectService.chatToggle.subscribe(res => {
      this.chatToggle = res;
    });
  }

  ngOnInit(): void {
    // subscribe to home component messages
    this.chatSubscription = this.noteService.readAllNote().subscribe(res => {
      if (res && res.data.length > 0) {
        // console.log("res",res);
        let list = res.data;
        // console.log("list1 " ,list);
        this.connectService.chatRefresh.next(list);
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
    this.userSubscription = this.connectService.userRefresh.subscribe(res => {
      if (res) {
        // console.log("res",res);
        this.user = res;
        this.username = this.user.username;
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
  }

  navigate(element) {
    this.router.navigate(["/chat/" + element + "/note"]);
  }



  deleteAllNotes() {
  }

  visible() {
    return {
      'dnone': !this.chatToggle,
    }
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
    this.chatSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.toggleSubscription.unsubscribe();
  }


}
