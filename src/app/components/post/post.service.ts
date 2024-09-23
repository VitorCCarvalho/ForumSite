import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs';
import { API } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly url = API + '/post'

  constructor(private http: HttpClient) { }

  listar(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url)
  }

  listarPorFThread(fthreadId : number): Observable<Post[]> {
    const url = `${this.url}?fthreadId=${fthreadId}`
    return this.http.get<Post[]>(url)
  }

  criar(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post)
  }

  editar(post: Post): Observable<Post> {
    const url = `${this.url}/${post.id}`
    return this.http.put<Post>(url, post)
  }

  excluir(id: number): Observable<Post> {
    const url = `${this.url}/${id}`
    return this.http.delete<Post>(url)
  }

  buscarPorId(id: number): Observable<Post> {
    const url = `${this.url}/${id}`
    return this.http.get<Post>(url)
  }

}