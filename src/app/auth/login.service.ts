import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Payload } from './payload.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API = environment.SERVIDOR+"/api/login";


  constructor() { }


  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
  }

  addToken(token: string) {
    const objeto = JSON.parse(token); // Converte a string JSON em um objeto
    const token_limpo = objeto.access_token; // Acessa o 'access_token' do objeto JSON
    localStorage.setItem('token', token_limpo); // Armazena apenas o JWT no localStorage
  }
  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Payload;
    if (user.role == role)
      return true;
    else
      return false;
  }


}
