import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../profile/services/user.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
  hasNewNotifications: boolean = true;
  hasUnreadMessages: boolean = true;
  token: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role')!;
    if (!this.token) {
      console.log('No hay token, redirigiendo al login');
      setTimeout(() => this.router.navigate(['/auth/login']), 0);
      return;
    }
    console.log('isMentor:1', this.isMentor);
    this.getUserRole();
    console.log('isMentor:2', this.isMentor);
  }

  role!: string;

  getUserRole(): void {
    if (this.token) {
      this.userService.getUserLogedByToken(this.token).subscribe({
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
    } else {
      console.log('No hay token, redirigiendo al login');
      setTimeout(() => this.router.navigate(['/auth/login']), 0);
    }
    console.log('isMentor:3', this.isMentor);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

}