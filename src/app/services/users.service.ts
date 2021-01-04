import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token")).accessToken}`
    })
  }

  getAllUsers(page: number){
    return this.http.get<any>(`${apiUrl}/Users?PageNumber=${page}`, this.httpOptions);
  }
}
