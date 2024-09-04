import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forum } from './forum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private readonly API = 'http://api-dev.eba-h9umdcqm.us-east-1.elasticbeanstalk.com/forum'

  constructor(private http: HttpClient) { }

  listar(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.API)
  }

  criar(pensamento: Forum): Observable<Forum> {
    return this.http.post<Forum>(this.API, pensamento)
  }

  editar(forum: Forum): Observable<Forum> {
    const url = `${this.API}/${forum.id}`
    return this.http.put<Forum>(url, forum)

  }

  excluir(id: number): Observable<Forum> {
    const url = `${this.API}/${id}`
    return this.http.delete<Forum>(url)
  }

  buscarPorId(id: number): Observable<Forum> {
    const url = `${this.API}/${id}`
    return this.http.get<Forum>(url)
  }

}
