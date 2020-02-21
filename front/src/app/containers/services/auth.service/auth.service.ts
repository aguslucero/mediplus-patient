import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  logIn( user: {email: string, password: string} ): Observable<any> {
    return this.httpClient.post('/auth/login', { user });
}

currentUser(): Observable<any> {
  return this.httpClient.get('/pacientes/currentUser', {headers: new HttpHeaders({'Authorization': localStorage.getItem('token') })});

}


singIn( user: {email: string, password: string, firstName: string, lastName: string} ): Observable<any> {
  return this.httpClient.post('/auth/singIn', { user });
}
}
