
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostReaction } from './post-reaction';
import { API } from '../../../app.component';

@Injectable({
  providedIn: 'root'
})
export class PostReactionService {

  private readonly url = API + '/postreaction'

  constructor(private http: HttpClient) { }

  listar(): Observable<PostReaction[]> {
    return this.http.get<PostReaction[]>(this.url)
  }

  listarPorPost(post : number, reaction?: string): Observable<PostReaction[]> {
    var url = ""
    if(typeof reaction!== 'undefined'){
      url = `${this.url}/${post}/?reaction=${reaction}`
    } else {
      url = `${this.url}/${post}`
    }
    return this.http.get<PostReaction[]>(url)
  }

  criar(PostReaction: PostReaction): Observable<PostReaction> {
    return this.http.post<PostReaction>(this.url, PostReaction)
  }

  buscarPorId(id: number): Observable<PostReaction> {
    const url = `${this.url}/${id}`
    return this.http.get<PostReaction>(url)
  }

  buscarScore(id: number): Observable<number> {
    const url = `${this.url}/score/${id}`
    return this.http.get<number>(url)
  }

  acharReaction(id: number, userId: string): Observable<PostReaction>{
    const url = `${this.url}/${id}/${userId}`
    return this.http.get<PostReaction>(url)
  }
}
