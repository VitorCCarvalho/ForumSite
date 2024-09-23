import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forum } from './forum';
import { Observable } from 'rxjs';
import { API } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private readonly url = API + '/forum'

  constructor(private http: HttpClient) { }

  listar(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.url)
  }

  criar(pensamento: Forum): Observable<Forum> {
    return this.http.post<Forum>(this.url, pensamento)
  }

  editar(forum: Forum): Observable<Forum> {
    const url = `${this.url}/${forum.id}`
    return this.http.put<Forum>(url, forum)

  }

  excluir(id: number): Observable<Forum> {
    const url = `${this.url}/${id}`
    return this.http.delete<Forum>(url)
  }

  buscarPorId(id: number): Observable<Forum> {
    const url = `${this.url}/${id}`
    return this.http.get<Forum>(url)
  }

}
