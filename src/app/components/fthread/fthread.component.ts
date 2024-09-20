import { FthreadReactionService } from './../reaction/fthread-reaction/fthread-reaction.service';
import { Component, Input, OnInit } from '@angular/core';
import { FThread } from './fthread';
import { FThreadService } from './fthread.service';
import { UserService } from '../user/user.service';
import { ForumService } from '../forum/forum.service';
import { RouterLink } from '@angular/router';
import { FthreadReactionComponent } from '../reaction/fthread-reaction/fthread-reaction.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-fthread',
  standalone: true,
  imports: [ RouterLink, FthreadReactionComponent, NgClass ],
  templateUrl: './fthread.component.html',
  styleUrls: ['./fthread.component.scss']
})
export class FthreadComponent implements OnInit{
  isHover = false
  
  constructor(private fthreadService : FThreadService, 
              private userService: UserService, 
              private forumService: ForumService,
              private fthreadReactionService: FthreadReactionService){}

  @Input() id : number = -1
  fthread : FThread = {
    "id": 0,
    "forumID": 6,
    "name": "",
    "text": "",
    "sticky": false,
    "active": true,
    "dateCreated": new Date("2024-01-17T11:56:22.365236"),
    "userId": "",
    "locked": false,
    "posts": [],
    "score": 0
  }

  name: string = ""
  forum: string = "Forum"
  @Input() showForum: boolean = false

  scoreResponse : string = ""

  finishLoading = "loading"

  ngOnInit(): void {
    if(this.id !== -1){
      this.fthreadService.buscarPorId(this.id).subscribe((fthread) =>{
        this.fthread = fthread;
  
        if(this.fthread.userId){
          this.userService.buscarPorId(this.fthread.userId).subscribe((user) => {
            this.name = user.name
          })
          this.fthreadReactionService.buscarScore(this.id).subscribe((score) => {
            this.fthread.score = score
          })
    
        }
  
        if(this.fthread.forumID){
          this.forumService.buscarPorId(this.fthread.forumID).subscribe((forum) => {
            this.forum = forum.name
          })
    
        }

        this.finishLoading = "loaded"
      });
    }
    
  }

  receiveScore(score: any){
    this.fthread.score = score 
  }

}
