import { UserService } from './../user/user.service';
import { PostService } from './post.service';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Post } from './post';
import { User } from '../user/user';
import { PostReactionComponent } from '../reaction/post-reaction/post-reaction.component';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostReactionComponent, NgClass],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit{
  constructor(private postService: PostService, private userService: UserService){}

  @Input() id : number = -1
  
  @Input() post : Post = {
    "id": 2,
    "threadId": 10,
    "text": "",
    "userId": "7de22010-e975-409f-a4b1-5a4e5ac419bc",
    "dateCreated": new Date("2024-01-25T11:23:31.3875008-03:00"),
    "locked": false
  }

  user!: User 

  finishLoading = "loading"

  ngOnInit(): void {
    if(this.id !== -1){
      this.postService.buscarPorId(this.id).subscribe((post) => {
        this.post = post
        
      })
    }

    this.userService.buscarPorId(this.post.userId).subscribe((user) => {
      this.user = user
    })

    
  }

  ngAfterViewInit(): void {
    this.finishLoading = "loaded"
  }


}
