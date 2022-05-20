import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { CompileShallowModuleMetadata } from '@angular/compiler';

import { userInfo } from 'os';
import { ConnectService } from 'src/app/user/services/connect/connect.service';

import { ProfileService } from 'src/app/user/services/profile/profile.service';
import { environment } from 'src/environments/environment';
import { ListService } from 'src/app/user/services/list/list.service';
import { NoteService } from 'src/app/user/services/note/note.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  noteListSubscription: Subscription;
  months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  chat;
  listItem;
  location: string = window.location.href;
  app: { name: string } = environment.app;
  refreshSubscription: Subscription;
  constructor(private profileService: ProfileService, private route: ActivatedRoute, private noteService: NoteService, private listService: ListService, private router: Router, private connectService: ConnectService, private titleService: Title, private meta: Meta) {
    this.titleService.setTitle(`Loading Notes ... | ${this.app.name}`);
    this.meta.updateTag({ name: 'description', content: `Read your notes.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
  }

  listForm = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  chatList;
  slug;
  username;
  avatar;
  // own = true;


  note: { description: string, privacy: string, slug: string, timestamp: string, title: string, userid: string, __v: number, _id: string };
  list;
  noteOwner: boolean = true;

  ngOnInit(): void {
    this.connectService.chatToggle.next(false);
    this.refreshSubscription = this.connectService.chatRefresh.subscribe(res => {
      if (res) {
        if (res.length > 0) {
          this.chatList = res;
        }
      }
    });


    this.route.parent.params.subscribe(routeParams => {
      this.username = routeParams.username;
    });
    this.route.params.subscribe(routeParams => {
      this.slug = routeParams.slug;
      this.note = undefined;
      this.list = undefined;
      this.readNoteList(this.username, this.slug);
    });
  }


  readNoteList(username: string, slug: string) {
    this.noteListSubscription = this.listService.readNoteList(username, slug).subscribe(res => {
      if (res) {
        this.note = res.data;
        this.list = res.data2;
        this.noteOwner = res.owner;
        this.avatar = res.avatar;
        this.titleService.setTitle(`${this.note.title} | ${this.app.name}`);
      }
    }, err => { if (err) { 
      this.router.navigate(["/notes/all"]);
    } });
  }


  createList() {
    if (this.listForm.valid) {
      let list = {
        "message": this.listForm.value.message
      }
      this.listService.createList(this.note._id, list).subscribe(
        (res) => {
          let info = res.info;
          this.list.push(info);
          this.listForm.reset();
        }, (err) => { });
    }
  }


  deleteList(listid) {
    this.listService.deleteList(this.note._id, listid).subscribe((res) => {
      if (res) {
        let info = res.info;
        this.list.forEach((element, index) => {
          if (element._id == info._id) {
            this.list.splice(index, 1);
          }
        });
      }
    }, (err) => { });
  }



  deleteNote() {
    this.noteService.deleteNote(this.note._id).subscribe((res) => {
      if (res) {
        let delChat = res.info;
        this.chatList.forEach((element, index) => {
          if (element._id == delChat._id) {
            this.chatList.splice(index, 1);
          }
        });
        this.connectService.chatRefresh.next(this.chatList);
        this.router.navigate(["/notes/all"]);
      }
    }, (err) => {
      if (err) { }
    });
  }

  editNote() {
    this.router.navigate([`/notes/${this.note.slug}/update`]);
  }

  // visible() {
  //   return {
  //     'side-hide': !this.own,
  //   }
  // }

  ngOnDestroy() {
    this.connectService.chatToggle.next(true);
    this.noteListSubscription.unsubscribe();
    this.refreshSubscription.unsubscribe();
  }
}
