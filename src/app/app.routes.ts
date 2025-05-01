import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
import { HomeComponent } from './profile/pages/home/home.component';
import { EditProfileComponent } from './profile/pages/edit-profile/edit-profile.component';
import { TutorCardComponent } from './match/pages/tutor-card/tutor-card.component';
import { PendingComponent } from './match/pages/pending/pending.component';
import { StudentCardComponent } from './match/pages/student-card/student-card.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'edit-profile', component: EditProfileComponent
  },
  {
    path: 'explore/tutors', component: TutorCardComponent //El estudiante puede ver los tutores disponibles con intereses
    //  similares a los suyos. (Solo deberán acceder los estudiantes a esta ruta)
  },
  {
    path: 'explore/students', component: StudentCardComponent //El tutor puede ver los estudiantes disponibles con intereses
    //  similares a los suyos. (Solo deberán acceder los tutores a esta ruta)
  },
  {
    path: 'explore/pendings', component: PendingComponent //El tutor puede ver los estudiantes que han solicitado una
    //  clase con él y decidir si acepta o no la solicitud. (Solo deberán acceder los tutores a esta ruta)
  }
];
