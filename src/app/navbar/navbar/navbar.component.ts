import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../profile/services/user.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationBellComponent } from "../notification-bell/notification-bell.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NotificationBellComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  goLanding() {
    this.router.navigate(['/landing']);

  }
  showPayments() {
    this.router.navigate(['/payments']);
  }
  showRegisteredUsers() {
    this.router.navigate(['/registered-users']);
  }
  showMatchesReport() {
    this.router.navigate(['/matches-report']);
  }

  isNotificationBoxOpen: boolean = false;

  toggleNotifications() {
    this.isNotificationBoxOpen = !this.isNotificationBoxOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.notification-container');

    if (!clickedInside) {
      this.isNotificationBoxOpen = false;
    }
  }


  showPaymentHistory() {
    this.router.navigate(['/payment-history']);
  }

  showMeetings() {
    this.router.navigate(['/meet']);
  }
  showLogin() {
    this.router.navigate(['/auth/login']);
  }
  showRegister() {
    this.router.navigate(['/auth/register']);
  }
  showTutors() {
    this.router.navigate(['/explore/tutors']);
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }
  showPendingRequests() {
    this.router.navigate(['/explore/pendings']);
  }
  showConfirmedMatches() {
    this.router.navigate(['/confirmed-matches']);
  }
  showChat() {
    this.router.navigate(['/chat']);
  }
  showProfile() {
    this.router.navigate(['/home']);
  }

  isMentor: boolean = false;
  hasNewNotifications: boolean = false;
  hasUnreadMessages: boolean = false;
  token: string | null = null;

  isLoggedIn = false;
  userRole: string | null = null;
  userId: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    const currentRoute = this.router.url;
    console.log('Ruta actual:', currentRoute);
  }


  suscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role') || '';

    // Obtener la ruta actual
    const currentRoute = this.router.url;
    console.log('Ruta actual:', currentRoute);

    // Lista de rutas públicas que no requieren redirección
    const publicRoutes = [
      '/auth/login',
      '/auth/register',
      '/auth/forgot-password',
      '/auth/reset-password'
    ];

    // Solo redirigir si no estamos en una ruta pública
    const isPublicRoute = publicRoutes.some(route => currentRoute.includes(route));
    console.log('isPublicRoute:', isPublicRoute);

    if (!this.token && isPublicRoute) {
      console.log('No hay token y no estamos en una ruta pública, redirigiendo al login');
      setTimeout(() => this.router.navigate(['/auth/login']), 0);
      return;
    }

    if (this.token) {
      this.getUserRole();
    }

    const sus = this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      console.log('isLoggedIn:', this.isLoggedIn);
    });

    const sus2 = this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      console.log('userRole:', this.userRole);
    });

    const sus3 = this.authService.userId$.subscribe(userId => {
      this.userId = userId;
      console.log('userId:', this.userId);
    });


    this.suscriptions.push(sus);
    this.suscriptions.push(sus2);
    this.suscriptions.push(sus3);
  }

  role!: string;

  getUserRole(): void {
    if (this.token) {
      const sus = this.userService.getUserLogedByToken(this.token).subscribe({
        next: (response) => {
          if (response.success) {
            this.isMentor = response.data.role === 'TUTOR';
            console.log('isMentor:2.5', this.isMentor);
          }
        },
        error: (error) => {
          console.error('Error al verificar el rol del usuario:', error);
        }
      });
      this.suscriptions.push(sus);
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userRole = null;
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}