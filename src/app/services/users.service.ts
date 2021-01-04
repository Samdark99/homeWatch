import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../constants/url';
import { User } from '../core/models/users';

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

  getUser(id: string){
    return this.http.get<any>(`${apiUrl}/Users/${id}`, this.httpOptions);
  }

  updateUser(id: string, body: User){
    return this.http.put<any>(`${apiUrl}/Users/${id}`, body, this.httpOptions);
  }

  deleteUser(id: string){
    return this.http.delete<any>(`${apiUrl}/Users/${id}`, this.httpOptions);
  }
}
