import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/auth.dto';
import { Observable } from 'rxjs';

const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    console.log('Clear session data');
    window.sessionStorage.clear();
  }

  public saveUser(user: LoginResponse): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): LoginResponse {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user) {
      return JSON.parse(user);
    }
    return new LoginResponse('', '', false, '');
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
