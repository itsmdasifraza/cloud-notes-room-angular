import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/user/services/chat/chat.service';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { UserService } from 'src/app/user/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

 
  chatSubscription: Subscription;
  chats;
  dummy;
  owneruser;
  ownerusername;
  location = window.location.href;
  app : { name : string } = environment.app;
  constructor(private route: ActivatedRoute, private connectService: ConnectService, private userService: UserService, private chatService: ChatService, private router: Router, private titleService: Title, private meta: Meta) {
    this.connectService.chatToggle.next(false);
    this.titleService.setTitle(`Update Notes | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Edit existing chat.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 


  }
  chatid;
  username;

  chatForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    privacy: new FormControl('', [Validators.required]),
  });
  userSubscription: Subscription;
  user;
  ngOnInit(): void {
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

    this.route.queryParams.subscribe(queryParams => {
      // do something with the query params
    });
    this.route.params.subscribe(routeParams => {
      // console.log(routeParams.chatid);
      this.chatid = routeParams.chatid;
      // this.username = routeParams.username;

      this.chatService.readSingleChat(routeParams.chatid).subscribe(res => {
        if (res) {
          // console.log("res",res);   
          this.chatForm.setValue({
            title: res.data.title,
            description: res.data.description,
            privacy: res.data.privacy
          });
        }
      }, err => {
        if (err) {
          // console.log("err", err);
        }
      });
    });
    this.connectService.chatRefresh.subscribe((res)=>{
      if(res){
        if(res.length > 0){
          this.chats = res;
          // console.log("list2 reteive", this.chats);
        }
      }
    },(err)=>{
      if(err){
        // console.log("err",err);
      }
    });
  }



  error = false;
  spinner: boolean = false;

  editChat() {
    if (this.chatForm.valid) {
      this.spinner = true;
      this.error = false;
      // console.log(this.chatForm.value);
      let chat = {
        "title": this.chatForm.value.title,
        "description": this.chatForm.value.description,
        "privacy": this.chatForm.value.privacy
      }

      this.chatService.editChat(chat, this.chatid).subscribe(
        (res) => {
          // console.log("res",res);
          this.chats.forEach((element , index )=> {
            if (element._id == this.chatid) {
            element.title =  this.chatForm.value.title;
              element.description = this.chatForm.value.description;
              element.privacy = this.chatForm.value.privacy;
            }
          });
          this.connectService.chatRefresh.next(this.chats);
          this.spinner = false;
          this.chatForm.reset();
          this.router.navigate([`/${this.username}/${this.chatid}`]);

        }, (err) => {
          // console.log("err",err);
          this.spinner = false;
          this.error = err.error.mssg;
        });
    }
  }

  ngOnDestroy(): void {
    this.connectService.chatToggle.next(true);
  }

}
