import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.dto';

const baseUrl = 'http://127.0.0.1:8000/api/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserByName(name: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(baseUrl + 'users/' + name);
  }

  deleteUserByName(name: string): Observable<Object> {
    return this.http.delete(baseUrl + 'users/' + name);
  }

  createUser(user: UserDTO): Observable<Object> {
    return this.http.post(baseUrl + 'users', user);
  }

  updateUser(name: string, user: UserDTO): Observable<Object> {
    return this.http.put(baseUrl + 'users/' + name, user);
  }

}