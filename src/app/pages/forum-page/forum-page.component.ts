import { FThread } from '../../components/fthread/fthread';
import { Component, OnInit } from '@angular/core';
import { FThreadService } from '../../components/fthread/fthread.service';
import { ForumService } from '../../components/forum/forum.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Forum } from '../../components/forum/forum';
import { FthreadComponent } from '../../components/fthread/fthread.component';
import { NgClass } from '@angular/common';
import { StorageService } from '../../services/storage/storage.service';
import { ModalService } from '../../services/modal/modal.service';


@Component({
  selector: 'app-forum-page',
  standalone: true,
  imports: [ FthreadComponent, NgClass, RouterLink ],
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss']
})
export class ForumPageComponent implements OnInit{
  
  listaFThreads : FThread[] = [];
  forum!: Forum;

  finishLoading: string = "loading"

  constructor(private fthreadService: FThreadService, 
              private forumService: ForumService, 
              private storageService: StorageService,
              private route: ActivatedRoute, 
              private router: Router,
              private modalService: ModalService){}

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
    if(this.storageService.getItem("jwt-session") != null){
      this.router.navigate(['/new-thread-page'], {queryParams: {forumId:this.forum.id ? this.forum.id : -1}})
    }else {
      console.log(this.storageService.getItem("jwt-session"))
      this.modalService.open("login");
    }
  }
}
