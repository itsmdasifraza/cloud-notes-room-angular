import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { NoteService } from 'src/app/user/services/note/note.service';
import { Subscription } from 'rxjs';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { ChatService } from 'src/app/user/services/chat/chat.service';
import { userInfo } from 'os';
import { ConnectService } from 'src/app/user/services/connect/connect.service';

import { ProfileService } from 'src/app/user/services/profile/profile.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  subscription: Subscription;
  notes = [];
  months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  chat;
  listItem;
  location = window.location.href;
  refreshSubscription : Subscription;
  constructor(private profileService: ProfileService ,private route: ActivatedRoute, private chatService: ChatService, private noteService: NoteService, private router: Router, private connectService: ConnectService, private titleService: Title, private meta: Meta) {
    this.titleService.setTitle("Read Chat");
    this.meta.updateTag({ name: 'description', content: `Read your chat.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }

  noteForm = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  chatList;
  chatid;
  owner;
  username;
  avatar;
  own = true;
  ngOnInit(): void {
    this.connectService.chatToggle.next(false);
    this.refreshSubscription = this.connectService.chatRefresh.subscribe(res => {
      if(res){
        if(res.length > 0){
          this.chatList = res;
          // console.log(this.chatList);
        }
      }
  });

    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
    this.route.parent.params.subscribe(routeParams => {
      this.username = routeParams.username;
    });
    this.route.params.subscribe(routeParams => {
      // console.log(routeParams.chatid);
      this.chatid = routeParams.chatid;
      
      console.log(this.username, this.chatid);
      this.notes = undefined;
     


      this.subscription = this.chatService.readSingleChat(routeParams.chatid).subscribe(res => {
        if (res) {
          // console.log("res",res);   
          this.owner = res.owner;
          this.chat = res.data;
          this.chat.stamp.month = this.months[this.chat.stamp.month];

          this.subscription = this.noteService.readNote(routeParams.chatid).subscribe(res => {
            if (res) {
              // console.log("res",res);
              
              this.notes = res.data;
            }
          }, err => {
            if (err) {
              // console.log("err", err);
            }
          });
          // console.log(this.chat);
          if(this.owner == "false"){
            this.own = false;
            this.profileService.readProfile(this.username).subscribe(res => {
              if (res) {
                // console.log("res",res);
                this.avatar = res.data.avatar;
              }
            }, err => {
              if (err) {
                // console.log("err", err);
              }
            });
          }
          else{
            this.own = true;
          }
        }
      }, err => {
        if (err) {
          // console.log("err", err);
          this.router.navigate(['/chat']);
        }
      });

    });
  }



  createNote() {

    if (this.noteForm.valid) {
      let note = {
        "message": this.noteForm.value.message
      }

      this.noteService.createNote(this.chatid, note).subscribe(
        (res) => {
          // console.log("res", res);
          let info = res.info;

          if (!this.notes) {
            this.notes = [info];
          }
          else {
            this.notes.push(info);
          }
          this.noteForm.reset();

        }, (err) => {
          // console.log("err",err);
        });
    }
  }


  deleteNote(noteid) {
    this.noteService.deleteNote(this.chatid, noteid).subscribe((res) => {
      if (res) {
        // console.log("res",res);
        let info = res.info;
        this.notes.forEach((element, index) => {
          // console.log(element,index)
          if (element._id == info._id && element.userid == info.userid && element.chatid == info.chatid) {
            this.notes.splice(index, 1);
          }
        });
      }
    }, (err) => {
      if (err) {
        // console.log("err",err);
      }
    });
  }

  deleteChat() {
    this.chatService.deleteChat(this.chatid).subscribe((res) => {
      if (res) {
        // console.log("res",res);
        let delChat = res.info;
        this.chatList.forEach((element , index )=> {
          if (element._id == delChat._id && element.userid == delChat.userid) {
            this.chatList.splice(index, 1);
          }
        });
        this.connectService.chatRefresh.next(this.chatList);
        this.router.navigate(["/chat"]);
      }
    }, (err) => {
      if (err) {
        // console.log("err",err);
      }
    });
  }
  editChat(){
    this.router.navigate([`/chat/edit/${this.username}/${this.chatid}`]);
  }

  visible() {
    return {
      'side-hide': !this.own,
    }
  }

  ngOnDestroy() {
    this.connectService.chatToggle.next(true);
    this.subscription.unsubscribe();
  }
}
