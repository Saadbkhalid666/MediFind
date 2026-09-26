import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import {  LoginComponent } from './pages/login/login';
import { OtpComponent } from './pages/otp/otp';

export const routes: Routes = [{
    path: 'register',
    component: Register
}, {
    path: 'login',
    component: LoginComponent
},{
    path:'otp',
    component:OtpComponent
}];
