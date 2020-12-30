import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../constants/url';
import { Login } from '../core/models/login';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded'
    })
  };

  login(username: string, password: string){
    let body = `username=${username}&password=${password}`;
    return this.http.post<any>(`${apiUrl}/Token`, body, this.httpOptions);
  }
}
