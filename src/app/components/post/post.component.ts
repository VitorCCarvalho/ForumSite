import { UserService } from './../user/user.service';
import { PostService } from './post.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from './post';
import { User } from '../user/user';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  faHeart = faHeart
  faHeartBroken = faHeartBroken
  constructor(private postService: PostService, private userService: UserService){}

  @Input() id : number = 0
  
  post : Post = {
    "id": 2,
    "threadId": 10,
    "text": "TestePost2",
    "userId": "7de22010-e975-409f-a4b1-5a4e5ac419bc",
    "dateCreated": new Date("2024-01-25T11:23:31.3875008-03:00"),
    "locked": false
  }

  user!: User 

  ngOnInit(): void {
    this.postService.buscarPorId(this.id).subscribe((post) => {
      this.post = post
    })

    this.userService.buscarPorId(this.post.userId).subscribe((user) => {
      this.user = user
    })
  }
}
