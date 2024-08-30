import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API = 'https://localhost:7082/post'

  constructor(private http: HttpClient) { }

  listar(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API)
  }

  listarPorFThread(fthreadId : number): Observable<Post[]> {
    const url = `${this.API}?fthreadId=${fthreadId}`
    return this.http.get<Post[]>(url)
  }

  criar(post: Post): Observable<Post> {
    return this.http.post<Post>(this.API, post)
  }

  editar(post: Post): Observable<Post> {
    const url = `${this.API}/${post.id}`
    return this.http.put<Post>(url, post)
  }

  excluir(id: number): Observable<Post> {
    const url = `${this.API}/${id}`
    return this.http.delete<Post>(url)
  }

  buscarPorId(id: number): Observable<Post> {
    const url = `${this.API}/${id}`
    return this.http.get<Post>(url)
  }

}