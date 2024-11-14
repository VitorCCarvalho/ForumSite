import { FThread } from './../../components/fthread/fthread';
import { PostService } from '../../components/post/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../components/post/post';
import { FThreadService } from '../../components/fthread/fthread.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../components/user/user.service';
import { User } from '../../components/user/user';
import { FthreadReactionComponent } from '../../components/reaction/fthread-reaction/fthread-reaction.component';
import { PostComponent } from '../../components/post/post.component';
import { NgClass } from '@angular/common';
import { FthreadImageService } from '../../components/fthread/fthread-image/fthread-image.service';
import { FthreadImage } from '../../components/fthread/fthread-image/fthread-image';
import { CloudinaryService } from '../../services/cloudinary/cloudinary.service';
import { forkJoin, from, mergeMap, Observable, switchMap, toArray } from 'rxjs';
import {CloudinaryModule} from '@cloudinary/ng';
import { CloudinaryImage } from '@cloudinary/url-gen';



@Component({
  selector: 'app-fthread-page',
  standalone: true,
  imports: [FthreadReactionComponent, PostComponent, NgClass, CloudinaryModule],
  templateUrl: './fthread-page.component.html',
  styleUrls: ['./fthread-page.component.scss']
})
export class FthreadPageComponent implements OnInit{
  fthreadId : number = 0
  listaPosts : Post[] = [];

  fthread: FThread ={
    id: 0,
    forumID: 0,
    name: "",
    text: "",
    sticky: false,
    active: true,
    dateCreated:  new Date("2024-01-25T11:23:31.3875008-03:00"),
    userId: "9239a0ee-71d6-4984-8a71-075d68bf31a7",
    locked: false,
    posts: [],
    score: 0
  };

  fThreadImages: FthreadImage[] = []

  cloudinaryImages: CloudinaryImage[] = []

  user: User = {
    id: "",
    name: "",
    username: "",
    description: "",
    email: "",
    lastLogin: new Date("2024-01-25T11:23:31.3875008-03:00"),
    dateJoined: new Date("2024-01-25T11:23:31.3875008-03:00")
  }

  commentCount: number = 0

  finishLoading: string = "loading"

  constructor(private postService: PostService, 
              private fthreadService: FThreadService, 
              private fthreadImageService: FthreadImageService,
              private cloudinaryService: CloudinaryService,
              private userService: UserService, 
              private route: ActivatedRoute,
              private router: Router){}
  
  ngOnInit(): void {
    var fthreadId = this.route.snapshot.queryParamMap.get('fthreadId');

    if(fthreadId){
      this.fthreadId = +fthreadId
      this.postService.listarPorFThread(this.fthreadId).subscribe((listaPosts) => {
        this.listaPosts = listaPosts
        this.commentCount = listaPosts.length

        this.fthreadService.buscarPorId(this.fthreadId).pipe( 
          switchMap((resp1) => 
            this.setFThreadAndReturnId(resp1)
          ),
          switchMap((resp2) =>
            this.fthreadImageService.listarPorFThread(resp2)
          ),
          switchMap((resp3) =>
            this.getCloudinaryImages(resp3)
          )
        ).subscribe((resp4) => {
          
          
        })


        this.finishLoading = "loaded"
      })

      

    }
  }

  setFThreadAndReturnId(fThread: FThread): Observable<number>{
    this.fthread = fThread

    let observable =  new Observable<number>((resp) =>
      resp.next(fThread.id)
    )

    if(fThread.id != null){
      return observable
    }
    return new Observable()
  }

  getCloudinaryImages(fthreadImages: FthreadImage[]): Observable<CloudinaryImage[]>{
    let requisicoesFThreadImages = fthreadImages.map(img => this.cloudinaryService.getImage(img.imgId))


    return forkJoin(requisicoesFThreadImages)

  }


  sendReply(){
    var reply = (<HTMLInputElement>document.getElementById("text-reply")).value


    if(reply != "" && this.fthread.id){
      var newPost: Post = {
        "threadId": this.fthread.id,
        "text": reply,
        "userId": "7de22010-e975-409f-a4b1-5a4e5ac419bc",
        "dateCreated": new Date(),
        "locked": false,
        "score": 0
      }

      this.postService.criar(newPost).subscribe(() => {
        this.router.navigate(['fthread-page'], { queryParams: {fthreadId: this.fthread.id}})
      })

    }
  }

}
