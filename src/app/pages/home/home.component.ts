import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../components/forum/forum.service';
import { Forum } from '../../components/forum/forum';
import { ForumComponent } from "../../components/forum/forum.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ForumComponent, ForumComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  listaForums : Forum[] = [];
  constructor(private service: ForumService){} 


  ngOnInit(): void {
    this.service.listar().subscribe((listaForums) => {
      this.listaForums = listaForums
      
    })
  }


}
