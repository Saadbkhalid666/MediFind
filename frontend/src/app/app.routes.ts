import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { OtpComponent } from './pages/otp/otp';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'verify-otp',
    component: OtpComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
