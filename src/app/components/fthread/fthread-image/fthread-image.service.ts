import { Injectable } from '@angular/core';
import { API } from '../../../app.component';
import { HttpClient } from '@angular/common/http';
import { FthreadImage } from './fthread-image';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FthreadImageService {

  private readonly url =  API + '/fthreadimage'

  constructor(private http: HttpClient) { }

  listarPorFThread(fthreadId: number): Observable<FthreadImage[]>{
    const url = `${this.url}?fthreadId=${fthreadId}`
    return this.http.get<FthreadImage[]>(url)
  }

  criar(fthreadImage: FthreadImage): Observable<FthreadImage> {
    return this.http.post<FthreadImage>(this.url, fthreadImage)
  }

  excluir(id: number): Observable<FthreadImage> {
    const url = `${this.url}/${id}`
    return this.http.delete<FthreadImage>(url)
  }
}
