import { Component, OnInit, Output  } from '@angular/core';
import { EventEmitter } from 'protractor';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services/user/user.service';
import { environment } from 'src/environments/environment';
import { NoteService } from 'src/app/user/services/note/note.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  chatSubscription : Subscription;
chats;
dummy;
owneruser;
ownerusername;
location : string = window.location.href;
app : { name : string } = environment.app;
  constructor(private connectService: ConnectService,private userService: UserService, private noteService : NoteService, private router : Router,private titleService:Title, private meta: Meta) {
    this.titleService.setTitle(`Create Notes | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Create new chat.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 


   }


  noteForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl(''),
    privacy: new FormControl('', [Validators.required]),
  });
  
  ngOnInit(): void {
      this.noteForm.setValue({
        title : '',
        description:'',
        privacy : "public"
      });

      this.connectService.chatToggle.next(false);
      this.chatSubscription = this.connectService.chatRefresh.subscribe((res)=>{
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
      this.userService.readUser().subscribe(res => {
        if (res) {
          // console.log("res",res);
          this.owneruser = res.info;
          this.ownerusername = this.owneruser.username;
        }
      }, err => {
        if (err) {
          // console.log("err", err);
        }
      });
  }

  

  error = false;
  spinner : boolean = false;
  
  createNote(){
    if(this.noteForm.valid){
      this.spinner = true;
      this.error = false;
        // console.log(this.chatForm.value);
        let note = {
          "title" : this.noteForm.value.title,
         "description" : this.noteForm.value.description,
         "privacy" : this.noteForm.value.privacy
        } 
        
        this.noteService.createNote(note).subscribe(
          (res)=>{
            // console.log("res",res);
            let singleChat = res.data;
            if(this.chats && this.chats.length > 0){

              this.chats.push(singleChat)
            }
            else{
              this.chats = [singleChat];
            }
           this.connectService.chatRefresh.next(this.chats);
            this.spinner = false;
            this.noteForm.reset();
            this.router.navigate([`/${this.ownerusername}/${res.data.slug}`]);

          },(err)=>{
            // console.log("err",err);
            this.spinner = false;
            this.error = err.error.mssg;
        });
    }
  }

  ngOnDestroy(): void {
    this.connectService.chatToggle.next(true);
    this.chatSubscription.unsubscribe();
    
}
}
