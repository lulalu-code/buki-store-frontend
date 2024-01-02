import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDTO } from '../models/auth.dto';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials: AuthDTO): Observable<Object> {
    return this.http.post(baseUrl + 'login', credentials);
  }

  logout(): Observable<Object> {
    return this.http.post(baseUrl + 'logout', undefined);
  }
  
}
