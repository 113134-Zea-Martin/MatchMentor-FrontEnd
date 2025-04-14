import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';

export const routes: Routes = [
    { 
        path: 'auth', 
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        //   { path: 'forgot-password', component: ForgotPasswordComponent }
        ]
      },
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];
