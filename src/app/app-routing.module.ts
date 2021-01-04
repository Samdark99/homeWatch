import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoggedInGuard } from './auth/logged-in.guard';
import { ABOUT, ADMIN, FORGOT, HOME, LOGIN, REGISTER, USER } from './constants/paths';

const routes: Routes = [
  {
    path: LOGIN,
    loadChildren: () => import('./components/pages/login/login.module').then(m => m.LoginModule),
    canActivate: [LoggedInGuard]
  },
  {
    path: REGISTER,
    loadChildren: () => import('./components/pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [LoggedInGuard]
  },
  {
    path: FORGOT,
    loadChildren: () => import('./components/pages/forgot/forgot.module').then(m => m.ForgotModule),
    canActivate: [AuthGuard]
  },
  {
    path: ADMIN,
    loadChildren: () => import('./components/pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: HOME,
    loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: `${USER}/:id`,
    loadChildren: () => import('./components/pages/user/user.module').then(m => m.UserModule),
    //canActivate: [AuthGuard]
  },
  {
    path: ABOUT,
    loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: LOGIN,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }