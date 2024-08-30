import { Component, Input, OnInit } from '@angular/core';
import { Forum } from './forum'
import { ForumService } from './forum.service'

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit{

  constructor(private service: ForumService) {}

  forum: Forum = {
    id: 0,
    name: '',
    description: '',
    threads: []
  }

  ngOnInit(): void {
    this.service.buscarPorId(this.id).subscribe((forum) => { 
      this.forum = forum;
    });
  }

  @Input() id: number = 1; 
  
}
