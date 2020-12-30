import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HOME, LOGIN, REGISTER } from '../constants/paths';
import { USERROLE } from '../constants/userRole';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private authGuardService: AuthGuardService,
              private router: Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.authGuardService.isLoggedIn()){
        return true;
      } else{
        let role = this.authGuardService.getUserData();
        let userData = 
          USERROLE[
            role["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
          ];
        if(userData){
          if(state.url !== LOGIN){
            this.router.navigate([userData['homePage']]);
            return false;
          }
          return true;
        }
      }
  }
}
