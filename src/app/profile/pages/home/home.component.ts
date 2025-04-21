import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserResponseDTO } from '../../models/user-response-dto';
import { Subscription } from 'rxjs';
import { Data, Me } from '../../models/me';
import { TutorProfileComponent } from "../tutor-profile/tutor-profile.component";
import { StudentProfileComponent } from "../student-profile/student-profile.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, TutorProfileComponent, RouterOutlet, RouterModule, StudentProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private router: Router) { }

  userLoged: Data | null = null;
  token: string | null = null;


  ngOnInit(): void {
    // Cargar el usuario logueado al inicializar el componente
    this.loadUserLoged();
  }

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones al destruir el componente
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadUserLoged() {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      // No hay token, redirigir al login
      console.log('No hay usuario logueado, redirigiendo al login');
      setTimeout(() => this.router.navigate(['/auth/login']), 0);
      return;
    }
    
    // Si hay token, continuar con la verificación
    const subs = this.userService.getUserLogedByToken(this.token).subscribe({
      next: (response: Me) => {
        if (response.success) {
          this.userLoged = response.data;
          console.log('Usuario logueado:', this.userLoged);
        } else {
          console.error('Error al obtener el usuario logueado:', response.message);
          // Manejar el error, redirigir al usuario a la página de inicio de sesión
          setTimeout(() => this.router.navigate(['/auth/login']), 0);
        }
      },
      error: (error) => {
        console.error('Error al obtener el usuario logueado:', error);
        // Eliminar el token inválido del localStorage
        localStorage.removeItem('token');
        // Manejar el error, redirigir al usuario a la página de inicio de sesión
        setTimeout(() => this.router.navigate(['/auth/login']), 0);
      }
    });
    this.subscriptions.push(subs); // Guardar la suscripción para cancelarla más tarde
  }

}
