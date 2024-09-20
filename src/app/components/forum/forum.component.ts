import { AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnInit } from '@angular/core';
import { Forum } from './forum'
import { ForumService } from './forum.service'
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, NgClass ],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit{

  constructor(private service: ForumService) {}

  finishLoading: string = "loading"

  forum: Forum = {
    id: 0,
    name: '',
    description: '',
    threads: []
  }

  ngOnInit(): void {
    this.service.buscarPorId(this.id).subscribe((forum) => { 
      this.forum = forum;
      this.finishLoading = "loaded"
    });
  }

  @Input() id: number = 1; 
  
}
