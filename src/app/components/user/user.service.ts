import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Login } from './login';
import { SignUp } from './signup';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders({ 'responseType': 'text' })

  private readonly API = 'https://localhost:7082/user'

  constructor(private http: HttpClient) { }

  criar(signup: SignUp): Observable<SignUp> {
    const url = `${this.API}/signup`
    return this.http.post<SignUp>(url, signup, {headers: this.headers})
  }

  buscarPorId(id: string): Observable<User> {
    const url = `${this.API}/${id}`
    return this.http.get<User>(url)
  }

  login(login: Login): Observable<string>{
    const url = `${this.API}/login`
    return this.http.post<string>(url, login, {headers: this.headers})
    
  }

}
