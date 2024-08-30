import { Component, Input, OnInit } from '@angular/core';

import { PostReaction } from './post-reaction';
import { PostReactionService } from './post-reaction.service';
import { jwtDecode } from 'jwt-decode';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-reaction',
  templateUrl: './post-reaction.component.html',
  styleUrls: ['./post-reaction.component.css']
})
export class PostReactionComponent {
  faPlus = faPlusCircle
  faMinus = faMinusCircle
  
  constructor(private service: PostReactionService){}

  @Input() postId: number = 0
  @Input() userId: string = ""
  listaPostReactions: PostReaction[] = []
  likes: PostReaction[] = []
  dislikes: PostReaction[] = []

  classLikes: string = "likes"
  classDislikes: string = "dislikes"
  likeCount: number = 0
  dislikeCount: number = 0
  
  score: number = 0

  ngOnInit(): void{
    this.service.listarPorPost(this.postId).subscribe((listaPostReactions) => {
      this.listaPostReactions = listaPostReactions

      this.likes = this.listaPostReactions.filter(i => i.reaction == true)
      this.dislikes = this.listaPostReactions.filter(i => i.reaction == false)

      this.likeCount = this.likes.length
      this.dislikeCount = this.dislikes.length
    })

    this.verifyLike()
    this.verifyDislike();

    this.service.buscarScore(this.postId).subscribe((score) => {
      this.score = score
    })
  }
  
  verifyLike(){
    var userSession: any = sessionStorage.getItem("jwt-session")
    if(userSession != null){
      var decodedSession: any = jwtDecode(userSession)
      var userId = decodedSession.id
      
      this.service.acharReaction(this.postId, userId).subscribe((postReaction) => {
        if(postReaction != null){
          if(postReaction.reaction == true){
            this.classLikes = "likes-selected"
          } 
        }
      })

    }
  }

  verifyDislike(){
    var userSession: any = sessionStorage.getItem("jwt-session")
    if(userSession != null){
      var decodedSession: any = jwtDecode(userSession)
      var userId = decodedSession.id
      
      this.service.acharReaction(this.postId, userId).subscribe((postReaction) => {
        if(postReaction != null){
          if(postReaction.reaction == false){
            this.classDislikes = "dislikes-selected"
          } 
        }
      })

    }

  }
  
}
