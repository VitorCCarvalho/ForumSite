import { FthreadReaction } from './fthread-reaction'; 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../../app.component';

@Injectable({
  providedIn: 'root'
})
export class FthreadReactionService {

  private readonly url = API + '/fthreadreaction'

  constructor(private http: HttpClient) { }

  listar(): Observable<FthreadReaction[]> {
    return this.http.get<FthreadReaction[]>(this.url)
  }

  listarPorFThread(fThread : number, reaction?: string): Observable<FthreadReaction[]> {
    var url = ""
    if(typeof reaction!== 'undefined'){
      url = `${this.url}/${fThread}/?reaction=${reaction}`
    } else {
      url = `${this.url}/${fThread}`
    }
    return this.http.get<FthreadReaction[]>(url)
  }

  criar(FthreadReaction: FthreadReaction): Observable<FthreadReaction> {
    return this.http.post<FthreadReaction>(this.url, FthreadReaction)
  }

  buscarPorId(id: number): Observable<FthreadReaction> {
    const url = `${this.url}/${id}`
    return this.http.get<FthreadReaction>(url)
  }

  buscarScore(id: number): Observable<number> {
    const url = `${this.url}/score/${id}`
    return this.http.get<number>(url)
  }
  acharReaction(id: number, userId: string): Observable<FthreadReaction>{
    const url = `${this.url}/${id}/${userId}`
    return this.http.get<FthreadReaction>(url)
  }
}
