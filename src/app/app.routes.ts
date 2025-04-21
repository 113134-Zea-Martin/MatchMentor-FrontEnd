import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
import { HomeComponent } from './profile/pages/home/home.component';

export const routes: Routes = [
    { 
        path: 'auth', 
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'forgot-password', component: ForgotPasswordComponent },
          {path: 'reset-password', component: ResetPasswordComponent},
        ]
      },
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      {
        path: 'home', component: HomeComponent 
      }
];
