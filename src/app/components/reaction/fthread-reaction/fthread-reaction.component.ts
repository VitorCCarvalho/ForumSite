import { FthreadReactionService } from './fthread-reaction.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


import { FthreadReaction } from './fthread-reaction';
import { jwtDecode } from 'jwt-decode';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-fthread-reaction',
  standalone: true,
  imports: [ NgClass ],
  templateUrl: './fthread-reaction.component.html',
  styleUrls: ['./fthread-reaction.component.scss']
})
export class FthreadReactionComponent implements OnInit{


  constructor(private service : FthreadReactionService){}

  @Input() fthreadId: number = 0
  @Input() userId: string = ""
  listaFthreadReactions : FthreadReaction[] = []
  likes : FthreadReaction[]  = []
  dislikes : FthreadReaction[] = [] 

  score: number = 0
  @Output() scoreOutput = new EventEmitter<number>()

  classLikes: string = "likes"
  classDislikes: string = "dislikes"
  likeCount: number = 0
  dislikeCount: number = 0

  ngOnInit(): void {
    let storage = sessionStorage
    var numberFThreadId : number = +this.fthreadId 
    this.service.listarPorFThread(numberFThreadId).subscribe((listaFthreadReactions) => {
      this.listaFthreadReactions = listaFthreadReactions
      this.likes = this.listaFthreadReactions.filter(i => i.reaction == true)
      this.dislikes = this.listaFthreadReactions.filter(i => i.reaction == false)
      
      this.likeCount = this.likes.length
      this.dislikeCount = this.dislikes.length

      this.verifyLike(storage)
      this.verifyDislike(storage);
    })

    this.service.buscarScore(numberFThreadId).subscribe((score) => {
      this.score = score
      this.scoreOutput.emit(this.score)

    })
  }

  

  verifyLike(storage: Storage){
    var userSession: any = storage.getItem("jwt-session")
    if(userSession != null){
      var decodedSession: any = jwtDecode(userSession)
      var userId = decodedSession.id
      
      var numberFThreadId = +this.fthreadId 
      this.service.acharReaction(numberFThreadId, userId).subscribe((postReaction) => {
        if(postReaction != null){
          if(postReaction.reaction == true){
            this.classLikes = "likes-selected"
          } 
        }
      })

    }
  }

  verifyDislike(storage: Storage){
    var userSession: any = storage.getItem("jwt-session")
    if(userSession != null){
      var decodedSession: any = jwtDecode(userSession)
      var userId = decodedSession.id
      
      var numberFThreadId = +this.fthreadId 
      this.service.acharReaction(numberFThreadId, userId).subscribe((postReaction) => {
        if(postReaction != null){
          if(postReaction.reaction == false){
            this.classDislikes = "dislikes-selected"
          } 
        }
      })

    }
  }
}
