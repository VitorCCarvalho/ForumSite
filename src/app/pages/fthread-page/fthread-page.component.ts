import { PostService } from '../../components/post/post.service';
import { Component, OnInit } from '@angular/core';
import { FThread } from '../../components/fthread/fthread';
import { Post } from '../../components/post/post';
import { FThreadService } from '../../components/fthread/fthread.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../components/user/user.service';
import { User } from '../../components/user/user';
import { FthreadReactionComponent } from '../../components/reaction/fthread-reaction/fthread-reaction.component';
import { PostComponent } from '../../components/post/post.component';



@Component({
  selector: 'app-fthread-page',
  standalone: true,
  imports: [FthreadReactionComponent, PostComponent],
  templateUrl: './fthread-page.component.html',
  styleUrls: ['./fthread-page.component.scss']
})
export class FthreadPageComponent implements OnInit{
  fthreadId : number = 0
  listaPosts : Post[] = [];

  fthread: FThread ={
    id: 0,
    forumID: 0,
    name: "testeFThread2",
    text: "testeTextFThread",
    sticky: false,
    active: true,
    dateCreated:  new Date("2024-01-25T11:23:31.3875008-03:00"),
    userId: "9239a0ee-71d6-4984-8a71-075d68bf31a7",
    locked: false,
    posts: [],
    score: 0
  };

  user: User = {
    id: "teste",
    name: "teste",
    username: "teste",
    description: "testeD",
    email: "teste",
    lastLogin: new Date("2024-01-25T11:23:31.3875008-03:00"),
    dateJoined: new Date("2024-01-25T11:23:31.3875008-03:00")
  }

  commentCount: number = 0

  constructor(private postService: PostService, 
              private fthreadService: FThreadService, 
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

        this.fthreadService.buscarPorId(this.fthreadId).subscribe((fthread) => {
          this.fthread = fthread

          if(this.fthread.userId){
            this.userService.buscarPorId(this.fthread.userId).subscribe((user) =>{
              this.user = user
            })
          }
  
        })
      })
      
      

    }
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
        // this.openSnackBar()
      })

    }
  }

  // openSnackBar() {
  //   this._snackBar.openFromComponent(SnackBarComponent, {
  //     duration: 2000,
  //   });
  // }
}
