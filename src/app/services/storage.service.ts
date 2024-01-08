import { Injectable } from '@angular/core';
import { UserDTO } from '../models/user.dto';
import { LoginResponse } from '../models/auth.dto';

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

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user) {
      return JSON.parse(user)
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
