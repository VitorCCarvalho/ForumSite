import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FThread } from './fthread';
import { Observable } from 'rxjs';
import { API } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class FThreadService {

  private readonly url =  API + '/fthread'

  constructor(private http: HttpClient) { }

  listar(): Observable<FThread[]> {
    return this.http.get<FThread[]>(this.url)
  }

  listarPorForum(forumId : number): Observable<FThread[]> {
    const url = `${this.url}?forumId=${forumId}`
    return this.http.get<FThread[]>(url)
  }

  listarMostLiked(period: number): Observable<FThread[]> {
    const url = `${this.url}/most-liked/${period}`
    return this.http.get<FThread[]>(url)
  } 

  criar(fthread: FThread): Observable<FThread> {
    return this.http.post<FThread>(this.url, fthread)
  }

  editar(fthread: FThread): Observable<FThread> {
    const url = `${this.url}/${fthread.id}`
    return this.http.put<FThread>(url, fthread)
  }

  excluir(id: number): Observable<FThread> {
    const url = `${this.url}/${id}`
    return this.http.delete<FThread>(url)
  }

  buscarPorId(id: number): Observable<FThread> {
    const url = `${this.url}/${id}`
    return this.http.get<FThread>(url)
  }

}