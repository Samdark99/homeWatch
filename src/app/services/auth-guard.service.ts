import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  public isAuthenticated(): boolean{
    const jwtHelper = new JwtHelperService();
    const token = JSON.parse(localStorage.getItem("token"));
    if(token){
      return !jwtHelper.isTokenExpired(token.accessToken);
    }
    return false;
  }

  public isLoggedIn(){
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }

  public getUserData(): any{
    let jwtHelper = new JwtHelperService();
    let token = JSON.parse(localStorage.getItem("token"));
    if(token){
      return jwtHelper.decodeToken(token.accessToken);
    }
    return '';
  }
}
