import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { NoteService } from 'src/app/user/services/note/note.service';
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
  constructor(private route: ActivatedRoute, private connectService: ConnectService, private userService: UserService, private noteService: NoteService, private router: Router, private titleService: Title, private meta: Meta) {
    this.connectService.chatToggle.next(false);
    this.titleService.setTitle(`Update Notes | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Edit existing chat.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 


  }
  chatid;
  username;

  noteForm = new UntypedFormGroup({
    title: new UntypedFormControl('', [Validators.required, Validators.minLength(2)]),
    description: new UntypedFormControl(''),
    privacy: new UntypedFormControl('', [Validators.required]),
  });
  userSubscription: Subscription;
  user;
  note;
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

      this.noteService.readSingleNote(routeParams.slug).subscribe(res => {
        if (res) {
          // console.log("res",res);
          this.note = res.data;   
          this.noteForm.setValue({
            title: this.note.title,
            description: this.note.description,
            privacy: this.note.privacy
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

  editNote() {
    if (this.noteForm.valid) {
      this.spinner = true;
      this.error = false;
      // console.log(this.chatForm.value);
      let note = {
        "title": this.noteForm.value.title,
        "description": this.noteForm.value.description,
        "privacy": this.noteForm.value.privacy
      }

      this.noteService.editNote(note, this.note._id).subscribe(
        (res) => {
          // console.log("res",res);
          this.chats.forEach((element , index )=> {
            if (element._id == this.chatid) {
            element.title =  this.noteForm.value.title;
              element.description = this.noteForm.value.description;
              element.privacy = this.noteForm.value.privacy;
            }
          });
          this.connectService.chatRefresh.next(this.chats);
          this.spinner = false;
          this.noteForm.reset();
          this.router.navigate([`/${this.username}/${res.data}`]);

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
