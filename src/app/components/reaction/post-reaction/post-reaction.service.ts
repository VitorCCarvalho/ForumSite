
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostReaction } from './post-reaction';

@Injectable({
  providedIn: 'root'
})
export class PostReactionService {

  private readonly API = 'https://localhost:7082/postreaction'

  constructor(private http: HttpClient) { }

  listar(): Observable<PostReaction[]> {
    return this.http.get<PostReaction[]>(this.API)
  }

  listarPorPost(post : number, reaction?: string): Observable<PostReaction[]> {
    var url = ""
    if(typeof reaction!== 'undefined'){
      url = `${this.API}/${post}/?reaction=${reaction}`
    } else {
      url = `${this.API}/${post}`
    }
    return this.http.get<PostReaction[]>(url)
  }

  criar(PostReaction: PostReaction): Observable<PostReaction> {
    return this.http.post<PostReaction>(this.API, PostReaction)
  }

  buscarPorId(id: number): Observable<PostReaction> {
    const url = `${this.API}/${id}`
    return this.http.get<PostReaction>(url)
  }

  buscarScore(id: number): Observable<number> {
    const url = `${this.API}/score/${id}`
    return this.http.get<number>(url)
  }

  acharReaction(id: number, userId: string): Observable<PostReaction>{
    const url = `${this.API}/${id}/${userId}`
    return this.http.get<PostReaction>(url)
  }
}
