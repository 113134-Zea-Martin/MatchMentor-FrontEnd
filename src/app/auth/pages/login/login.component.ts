import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

declare var bootstrap: any; // Para interactuar con los modales de Bootstrap

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Inicializamos los modales de Bootstrap
    // this.successModal = new bootstrap.Modal(document.getElementById('successModal')!);
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal')!);
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones al destruir el componente
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  message: string = '';

  successModal: any;
  errorModal: any;

  onSubmit() {

    if (this.loginForm.valid) {
      const email = this.loginForm.value.email!;
      const password = this.loginForm.value.password!;

      const subs = this.authService.loginUser(email, password).subscribe({
        next: (response) => {
          console.log(response.message);
          // console.log('Token guardado:', response.data.token);
          
          if (response.success) {
            localStorage.setItem('token', response.data.token); // Guardar el token en el localStorage
            this.router.navigate(['/home']); // Redirigir a la página de inicio
          } else {
            this.message = response.message;
            console.error('Error en el login:', response.message);
            this.errorModal.show(); // Mostrar el modal de error
          }

        },
        error: (error) => {
          // Manejo de errores si la solicitud falla
          this.message = 'Error en el servidor: \n Intente más tarde.';
          this.errorModal.show(); // Mostrar el modal de error
        }
      })
      this.subscriptions.push(subs); // Guardar la suscripción para poder cancelarla si es necesario
    }
  }


  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
}
