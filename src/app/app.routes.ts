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
import { AppRoutes } from './environment';
import { ConfirmedMatchsComponent } from './match/pages/confirmed-matchs/confirmed-matchs.component';
import { ChatComponent } from './match/pages/chat/chat.component';
import { MeetingHistoryListComponent } from './meet/pages/meeting-history-list/meeting-history-list.component';
import { PaymentHistoryComponent } from './meet/pages/payment-history/payment-history.component';
import { NotificationBellComponent } from './navbar/notification-bell/notification-bell.component';

export const routes: Routes = [
  {
    path: AppRoutes.AUTH.BASE,
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
  },
  {
    path: 'confirmed-matches', component: ConfirmedMatchsComponent //El tutor o estudiante puede ver los matches confirmados 
    // para poder chatear con el otro usuario. (Ambos deberán acceder a esta ruta)
  },
  {
    // path: 'chat/:matchId', component: ChatComponent //El tutor o estudiante puede ver los matches confirmados
    path: 'chat', component: ChatComponent //El tutor o estudiante puede ver los matches confirmados
    // para poder chatear con el otro usuario. (Ambos deberán acceder a esta ruta)
  },
  {
    path: 'meet', component: MeetingHistoryListComponent //El tutor o estudiante puede ver el historial de reuniones
    // con otros usuarios. (Ambos deberán acceder a esta ruta)
  },
  {
    path: 'payment-history', component: PaymentHistoryComponent //El tutor o estudiante puede ver el historial de pagos
    // con otros usuarios. (Ambos deberán acceder a esta ruta)
  },
  {
    path: 'notifications', component: NotificationBellComponent //El tutor o estudiante puede ver las notificaciones
  }
];
