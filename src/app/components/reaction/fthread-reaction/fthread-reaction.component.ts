import { FthreadReactionService } from './fthread-reaction.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


import { FthreadReaction } from './fthread-reaction';
import { jwtDecode } from 'jwt-decode';
import { NgClass } from '@angular/common';
import { StorageService } from '../../../services/storage/storage.service';
import { ModalComponent } from '../../modal/modal.component';
import { WarningDialogComponent } from "../../dialog/warning-dialog/warning-dialog.component";

@Component({
  selector: 'app-fthread-reaction',
  standalone: true,
  imports: [NgClass, ModalComponent, WarningDialogComponent],
  templateUrl: './fthread-reaction.component.html',
  styleUrls: ['./fthread-reaction.component.scss']
})
export class FthreadReactionComponent implements OnInit{


  constructor(private service : FthreadReactionService, private storageService: StorageService){}

  @Input() fthreadId: number = 0
  @Input() userId: string = ""
  listaFthreadReactions : FthreadReaction[] = []
  likes : FthreadReaction[]  = []
  dislikes : FthreadReaction[] = [] 

  score: number = 0
  @Output() scoreOutput = new EventEmitter<number>()

  classLikes: string = "img-like"
  classDislikes: string = "img-dislike"
  likeCount: number = 0
  dislikeCount: number = 0

  ngOnInit(): void {
    
    var numberFThreadId : number = +this.fthreadId 
    this.service.listarPorFThread(numberFThreadId).subscribe((listaFthreadReactions) => {
      this.listaFthreadReactions = listaFthreadReactions
      this.likes = this.listaFthreadReactions.filter(i => i.reaction == true)
      this.dislikes = this.listaFthreadReactions.filter(i => i.reaction == false)
      
      this.likeCount = this.likes.length
      this.dislikeCount = this.dislikes.length

      this.score = this.likeCount - this.dislikeCount
      this.scoreOutput.emit(this.score)

      this.verifyLike()
      this.verifyDislike();
    })
  }

  

  verifyLike(){
    var userSession: any = this.storageService.getItem("jwt-session")
    if(userSession != null){
      var decodedSession: any = jwtDecode(userSession)
      var userId = decodedSession.id
      
      var numberFThreadId = +this.fthreadId 
      this.service.acharReaction(numberFThreadId, userId).subscribe((postReaction) => {
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
      
      var numberFThreadId = +this.fthreadId 
      this.service.acharReaction(numberFThreadId, userId).subscribe((postReaction) => {
        if(postReaction != null){
          if(postReaction.reaction == false){
            this.classDislikes = "img-dislikes-selected"
          } 
        }
      })

    }
  }

  addLike(){
    var userSession: any = this.storageService.getItem("jwt-session")
    if(userSession != null){
      var decodedSession: any = jwtDecode(userSession)
      var userId = decodedSession.id
    } else{
      // ModalComponent.show = true
    }
  }
}
