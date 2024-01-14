import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.dto';
import { environment } from './../../environments/environment';
import { StorageService } from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {}

  getUserByName(name: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(environment.api_url + 'users/' + name);
  }

  deleteUserByName(name: string): Observable<Object> {
    return this.http.delete(environment.api_url + 'users/' + name);
  }

  updateUser(name: string, user: UserDTO): Observable<Object> {
    return this.http.put(environment.api_url + 'users/' + name, user, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.storageService.getUser().token})});
  }

}