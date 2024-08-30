import { FthreadReactionService } from './../reaction/fthread-reaction/fthread-reaction.service';
import { Component, Input, OnInit } from '@angular/core';
import { FThread } from './fthread';
import { FThreadService } from './fthread.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user/user.service';
import { ForumService } from '../forum/forum.service';

@Component({
  selector: 'app-fthread',
  templateUrl: './fthread.component.html',
  styleUrls: ['./fthread.component.css']
})
export class FthreadComponent implements OnInit{
  faHeart = faHeart
  faHeartBroken = faHeartBroken
  isHover = false
  
  constructor(private fthreadService : FThreadService, 
              private userService: UserService, 
              private forumService: ForumService,
              private fthreadReactionService: FthreadReactionService){}

  @Input() id : number = 0
  fthread : FThread = {
    "id": 0,
    "forumID": 6,
    "name": "TesteFThread",
    "text": "TesteText",
    "sticky": false,
    "active": true,
    "dateCreated": new Date("2024-01-17T11:56:22.365236"),
    "userId": "userId",
    "locked": false,
    "posts": [],
    "score": 0
  }

  name: string = "Usuario"
  forum: string = "Forum"
  @Input() showForum: boolean = false

  scoreResponse : string = ""

  ngOnInit(): void {
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
    });
  }

  receiveScore(score: any){
    this.fthread.score = score 
    console.log(this.fthread.score)
  }

}
