import { Component, Input, OnInit } from '@angular/core';

import { PostReaction } from './post-reaction';
import { PostReactionService } from './post-reaction.service';
import { jwtDecode } from 'jwt-decode';
import { NgClass } from '@angular/common';
import { StorageService } from '../../../services/storage/storage.service';



@Component({
  selector: 'app-post-reaction',
  templateUrl: './post-reaction.component.html',
  standalone: true,
  imports: [ NgClass ],
  styleUrls: ['./post-reaction.component.scss']
})
export class PostReactionComponent {
  constructor(private service: PostReactionService, private storageService: StorageService){}

  @Input() postId: number = 0
  @Input() userId: string = ""
  listaPostReactions: PostReaction[] = []
  likes: PostReaction[] = []
  dislikes: PostReaction[] = []

  classLikes: string = "img-like"
  classDislikes: string = "img-dislike"
  likeCount: number = 0
  dislikeCount: number = 0
  
  score: number = 0

  ngOnInit(): void{
    if(this.postId != -1){
    
      this.service.listarPorPost(this.postId).subscribe((listaPostReactions) => {
        this.listaPostReactions = listaPostReactions

        this.likes = this.listaPostReactions.filter(i => i.reaction == true)
        this.dislikes = this.listaPostReactions.filter(i => i.reaction == false)

        this.likeCount = this.likes.length
        this.dislikeCount = this.dislikes.length

        this.score = this.likeCount - this.dislikeCount
      })

      this.verifyLike()
      this.verifyDislike();
    }
  }
  
  verifyLike(){
    var userSession: any = this.storageService.getItem("jwt-session")
    if(userSession != null){
      var decodedSession: any = jwtDecode(userSession)
      var userId = decodedSession.id
      
      this.service.acharReaction(this.postId, userId).subscribe((postReaction) => {
        if(postReaction != null){
          if(postReaction.reaction == true){
            this.classLikes = "img-likes-selected"
          } 
        }
      })

    }
  }

  verifyDislike(){
    var userSession: any = this.storageService.getItem("jwt-session")
    if(userSession != null){
      var decodedSession: any = jwtDecode(userSession)
      var userId = decodedSession.id
      
      this.service.acharReaction(this.postId, userId).subscribe((postReaction) => {
        if(postReaction != null){
          if(postReaction.reaction == false){
            this.classDislikes = "img-dislikes-selected"
          } 
        }
      }
      )
    }

  }
  
}
