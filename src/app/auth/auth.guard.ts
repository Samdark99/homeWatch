import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN, REGISTER } from '../constants/paths';
import { USERROLE } from '../constants/userRole';
import { AuthGuardService } from '../services/auth-guard.service';
import { LogInService } from '../services/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authGuardService: AuthGuardService,
              private logInService: LogInService,
              private router: Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      //Search log-in in localstorage
      if(this.authGuardService.isAuthenticated()){
        let role = this.authGuardService.getUserData();
        let userData = 
          USERROLE[
            role["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
          ];
        //When exist token valid
        if(userData){
          if(state.url === `/${LOGIN}`){
            this.router.navigate([userData['homePage']]);
            return false;
          }
          //When role stay in a url valid for him
          if(userData['urls'].includes(state.url.slice(1))){
            return true;
          } else{
            this.router.navigate([userData['homePage']]);
            return false;
          }
        }
        return true;
      } else{
        if(state.url !== `/${LOGIN}`){
          this.router.navigate([LOGIN]);
          return false;
        }
        return true;
      }
    }
}
