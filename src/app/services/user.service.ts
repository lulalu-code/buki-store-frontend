import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.dto';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserByName(name: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(environment.api_url + 'users/' + name);
  }

  deleteUserByName(name: string): Observable<Object> {
    return this.http.delete(environment.api_url + 'users/' + name);
  }

  createUser(user: UserDTO): Observable<Object> {
    return this.http.post(environment.api_url + 'users', user);
  }

  updateUser(name: string, user: UserDTO): Observable<Object> {
    return this.http.put(environment.api_url + 'users/' + name, user);
  }

}