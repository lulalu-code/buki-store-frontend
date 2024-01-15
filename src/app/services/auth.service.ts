import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { AuthDTO } from '../models/auth.dto';
import { UserDTO } from '../models/user.dto';
import { StorageService } from './storage.service';


const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000')
  .set('Access-Control-Allow-Credentials', 'true');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token!: string;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(credentials: AuthDTO): Observable<any> {

    return this.http.post(environment.api_url + 'login', credentials, { headers: headers } );
    /*let response = this.http.post<LoginResponse>(environment.api_url + 'login', credentials).pipe(
      catchError(this.handleError)
    )
    response.subscribe(res => this.token = res.token);
    return response;*/

    //return this.http.get(url, { headers: new HttpHeaders({'Authorization': 'Bearer ' + token})});
    /*let headers = new HttpHeaders().set('header1', hvalue1); // create header object
    headers = headers.append('header2', hvalue2); // add a new header, creating a new object

    let params = new HttpParams().set('param1', value1); // create params object
    params = params.append('param2', value2); // add a new param, creating a new object

    return this._http.get<any[]>(url, { headers: headers, params: params })*/
  }

  logout(): Observable<any> {
    const tokenHeaders = headers.set('Authorization', 'Bearer ' + this.storageService.getUser().token)
    return this.http.post(environment.api_url + 'logout', { }, { headers: tokenHeaders });
  }

  register(user: UserDTO): Observable<any> {
    return this.http.post(environment.api_url + 'register', user, { headers: headers });
  }

  /*
  login(credentials: AuthDTO): any {
  axios.get('/sanctum/csrf-cookie').then(() => {
    return this.http.post(environment.api_url + 'login', credentials);
  });
  }*/

  /*
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }; */
  
}
