import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../profile/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMentor: boolean = false; // Inicialmente falso
  hasNewNotifications: boolean = true; // Ejemplo
  hasUnreadMessages: boolean = true; // Ejemplo

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService // Inyecta el servicio de usuario
  ) { }

  ngOnInit(): void {
    // Aquí puedes obtener el rol del usuario al iniciar el componente
    this.getUserRole();
  }

  getUserRole(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUserLogedByToken(token).subscribe({
        next: (response) => {
          if (response.success) {
            this.isMentor = response.data.role === 'TUTOR'; // Cambia 'mentor' por el rol correspondiente
          } else {
            console.error('Error al obtener el rol del usuario:', response.message);
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
  }

  logout(): void {
    // this.authService.logout(); // Llama a tu servicio de cierre de sesión
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}