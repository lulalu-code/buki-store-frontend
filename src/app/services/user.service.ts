import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.dto';
import { environment } from './../../environments/environment';
import { StorageService } from './storage.service';


const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {}

  getUserByName(name: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(environment.api_url + 'users/' + name, { headers: headers });
  }

  deleteUserByName(name: string): Observable<any> {
    return this.http.delete(environment.api_url + 'users/' + name, { headers: headers });
  }

  updateUser(name: string, user: UserDTO): Observable<any> {
    const tokenHeaders = headers.set('Authorization', 'Bearer ' + this.storageService.getUser().token);
    return this.http.put(environment.api_url + 'users/' + name, user, { headers: tokenHeaders });
  }

}