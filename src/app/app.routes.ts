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
import { AppRoles, AppRoutes } from './environment';
import { ConfirmedMatchsComponent } from './match/pages/confirmed-matchs/confirmed-matchs.component';
import { ChatComponent } from './match/pages/chat/chat.component';
import { MeetingHistoryListComponent } from './meet/pages/meeting-history-list/meeting-history-list.component';
import { PaymentHistoryComponent } from './meet/pages/payment-history/payment-history.component';
import { NotificationBellComponent } from './navbar/notification-bell/notification-bell.component';
import { RegisteredUsersReportComponent } from './admin/reports/pages/registered-users/registered-users.component';
import { MatchesComponent } from './admin/reports/pages/matches/matches.component';
import { PaymentsComponent } from './admin/reports/pages/payments/payments.component';
import { authGuard } from './auth/guards/auth.guard';
import { roleGuard } from './auth/guards/role.guard';
import { noAuthGuard } from './auth/guards/no-auth.guard';
import { LandingComponent } from './navbar/landing/landing.component';

export const routes: Routes = [
  {
    path: AppRoutes.AUTH.BASE,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
    canActivate: [noAuthGuard], // Protege las rutas de autenticación
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '',
    redirectTo: 'home', // Debe redirigir al home si no hay ruta definida
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent, //El usuario puede ver su perfil y los matches confirmados. (Ambos deberán acceder a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.STUDENT, AppRoles.TUTOR, AppRoles.ADMIN] }
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent, //El usuario puede editar su perfil. (Ambos deberán acceder a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.STUDENT, AppRoles.TUTOR] }
  },
  {
    path: 'explore/tutors',
    component: TutorCardComponent, //El estudiante puede ver los tutores disponibles con intereses
    //  similares a los suyos. (Solo deberán acceder los estudiantes a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.STUDENT] }
  },
  {
    path: 'explore/students',
    component: StudentCardComponent, //El tutor puede ver los estudiantes disponibles con intereses
    //  similares a los suyos. (Solo deberán acceder los tutores a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.TUTOR] }
  },
  {
    path: 'explore/pendings',
    component: PendingComponent, //El tutor puede ver los estudiantes que han solicitado una
    //  clase con él y decidir si acepta o no la solicitud. 
    // (Solo deberán acceder los tutores a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.TUTOR] }
  },
  {
    path: 'confirmed-matches',
    component: ConfirmedMatchsComponent, //El tutor o estudiante puede ver los matches confirmados 
    // para poder chatear con el otro usuario. (Ambos deberán acceder a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.STUDENT, AppRoles.TUTOR] }
  },
  {
    // path: 'chat/:matchId', component: ChatComponent //El tutor o estudiante puede ver los matches confirmados
    path: 'chat',
    component: ChatComponent, //El tutor o estudiante puede ver los matches confirmados
    // para poder chatear con el otro usuario. (Ambos deberán acceder a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.STUDENT, AppRoles.TUTOR] }
  },
  {
    path: 'meet',
    component: MeetingHistoryListComponent, //El tutor o estudiante puede ver el historial de reuniones
    // con otros usuarios. (Ambos deberán acceder a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.STUDENT, AppRoles.TUTOR] }
  },
  {
    path: 'payment-history',
    component: PaymentHistoryComponent, //El tutor o estudiante puede ver el historial de pagos
    // con otros usuarios. (Ambos deberán acceder a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.STUDENT, AppRoles.TUTOR] }
  },
  // {
  //   path: 'notifications', 
  //   component: NotificationBellComponent, //El tutor o estudiante puede ver las notificaciones
  //   canActivate: [authGuard, roleGuard],
  //   data: { roles: [AppRoles.STUDENT, AppRoles.TUTOR] } // Solo el administrador puede acceder a esta ruta
  // },
  {
    path: 'registered-users',
    component: RegisteredUsersReportComponent, //El Administrador puede ver el reporte de usuarios registrados
    // en la plataforma. (Solo deberá acceder el administrador a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.ADMIN] } // Solo el administrador puede acceder a esta ruta
  },
  {
    path: 'matches-report',
    component: MatchesComponent, //El Administrador puede ver el reporte de matches realizados
    // en la plataforma. (Solo deberá acceder el administrador a esta ruta)'
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.ADMIN] } // Solo el administrador puede acceder a esta ruta
  },
  {
    path: 'payments',
    component: PaymentsComponent, //El Administrador puede ver el reporte de pagos realizados
    // en la plataforma. (Solo deberá acceder el administrador a esta ruta)
    canActivate: [authGuard, roleGuard],
    data: { roles: [AppRoles.ADMIN] } // Solo el administrador puede acceder a esta ruta
  }

];
