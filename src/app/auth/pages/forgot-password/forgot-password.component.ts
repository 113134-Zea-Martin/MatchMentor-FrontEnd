import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

declare var bootstrap: any; // Para interactuar con los modales de Bootstrap

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    // Inicializamos los modales de Bootstrap
    this.successModal = new bootstrap.Modal(document.getElementById('successModal')!);
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal')!);
  }

  constructor(private authService: AuthService) { }

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones al destruir el componente
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  message: string = '';
  successModal: any;
  errorModal: any;

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email!;
      const subs = this.authService.requestPasswordReset(email).subscribe({
        next: (response) => {
          this.message = response.message;
          this.successModal.show(); // Mostrar el modal de éxito
        },
        error: (error) => {
          this.message = 'Error al enviar el correo de restablecimiento.';
          this.errorModal.show(); // Mostrar el modal de error
        }
      });

      this.subscriptions.push(subs); // Guardar la suscripción para poder cancelarla si es necesario

    } else {
      alert('Por favor, ingresa un correo electrónico válido.');
    }
  }

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

}