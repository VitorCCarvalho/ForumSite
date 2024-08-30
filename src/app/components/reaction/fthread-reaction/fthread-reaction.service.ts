import { FthreadReaction } from './fthread-reaction'; 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FthreadReactionService {

  private readonly API = 'https://localhost:7082/fthreadreaction'

  constructor(private http: HttpClient) { }

  listar(): Observable<FthreadReaction[]> {
    return this.http.get<FthreadReaction[]>(this.API)
  }

  listarPorFThread(fThread : number, reaction?: string): Observable<FthreadReaction[]> {
    var url = ""
    if(typeof reaction!== 'undefined'){
      url = `${this.API}/${fThread}/?reaction=${reaction}`
    } else {
      url = `${this.API}/${fThread}`
    }
    return this.http.get<FthreadReaction[]>(url)
  }

  criar(FthreadReaction: FthreadReaction): Observable<FthreadReaction> {
    return this.http.post<FthreadReaction>(this.API, FthreadReaction)
  }

  buscarPorId(id: number): Observable<FthreadReaction> {
    const url = `${this.API}/${id}`
    return this.http.get<FthreadReaction>(url)
  }

  buscarScore(id: number): Observable<number> {
    const url = `${this.API}/score/${id}`
    return this.http.get<number>(url)
  }
  acharReaction(id: number, userId: string): Observable<FthreadReaction>{
    const url = `${this.API}/${id}/${userId}`
    return this.http.get<FthreadReaction>(url)
  }
}
