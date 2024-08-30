import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FThread } from './fthread';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FThreadService {

  private readonly API = 'https://localhost:7082/fthread'

  constructor(private http: HttpClient) { }

  listar(): Observable<FThread[]> {
    return this.http.get<FThread[]>(this.API)
  }

  listarPorForum(forumId : number): Observable<FThread[]> {
    const url = `${this.API}?forumId=${forumId}`
    return this.http.get<FThread[]>(url)
  }

  listarMostLiked(period: number): Observable<FThread[]> {
    const url = `${this.API}/most-liked/${period}`
    return this.http.get<FThread[]>(url)
  } 

  criar(fthread: FThread): Observable<FThread> {
    return this.http.post<FThread>(this.API, fthread)
  }

  editar(fthread: FThread): Observable<FThread> {
    const url = `${this.API}/${fthread.id}`
    return this.http.put<FThread>(url, fthread)
  }

  excluir(id: number): Observable<FThread> {
    const url = `${this.API}/${id}`
    return this.http.delete<FThread>(url)
  }

  buscarPorId(id: number): Observable<FThread> {
    const url = `${this.API}/${id}`
    return this.http.get<FThread>(url)
  }

}