import { FThread } from '../../components/fthread/fthread';
import { Component, OnInit } from '@angular/core';
import { FThreadService } from '../../components/fthread/fthread.service';
import { ForumService } from '../../components/forum/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Forum } from '../../components/forum/forum';
import { FthreadComponent } from '../../components/fthread/fthread.component';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-forum-page',
  standalone: true,
  imports: [ FthreadComponent, NgClass ],
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss']
})
export class ForumPageComponent implements OnInit{
  
  listaFThreads : FThread[] = [];
  forum!: Forum;

  finishLoading: string = "loading"

  constructor(private fthreadService: FThreadService, 
              private forumService: ForumService, 
              private route: ActivatedRoute, 
              private router: Router){}

  ngOnInit(): void {
    var forumId = this.route.snapshot.queryParamMap.get('forumId');
    if(forumId){
      
      var numberForumId: number = +forumId
      this.fthreadService.listarPorForum(numberForumId).subscribe((listafthreads) => {
        this.listaFThreads = listafthreads
      })
      this.forumService.buscarPorId(numberForumId).subscribe((forum) => {
        this.forum = forum
        
      })
    }

  }

  ngAfterViewChecked(){
    this.finishLoading = "loaded"
  }



  verifySession(){
    if(sessionStorage.getItem("jwt-session") != null){
      this.router.navigate(['/newThread-page'], {queryParams: {forumId:this.forum.id ? this.forum.id : -1}})
    }else {
      // this.sidebar.openLoginDialog();
    }
  }
}
