import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import {
  AbstractControl,
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any; // Para interactuar con los modales de Bootstrap

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword!;
      const confirmPassword = this.resetPasswordForm.value.confirmPassword!;

      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      // Aquí puedes llamar al servicio para restablecer la contraseña
      const subscription = this.authService
        .resetPassword(this.token!, newPassword)
        .subscribe({
          next: (response) => {
            if (response.success) {
              // Manejar el éxito del restablecimiento de contraseña
              console.log('Contraseña restablecida con éxito');
            } else {
              this.errorMessage = response.message || 'Error al restablecer la contraseña';
            }
          },
          error: (error) => {
            this.errorMessage = error.error.message || 'Error con el servidor. Inténtelo más tarde.';
            console.error('Error en el restablecimiento de contraseña:', error);
          },
        });

      this.subscriptions.push(subscription);
    }
  }

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  token: string | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    // Obtener el token de la URL
    // const urlParams = new URLSearchParams(window.location.search);
    // const token = urlParams.get('token');
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        this.errorMessage = 'Token no válido o ausente';
      }
    });
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { notSame: true }
      : null;
  };

  resetPasswordForm: FormGroup = new FormGroup(
    {
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    { validators: this.passwordMatchValidator }
  );

  showPassword: boolean = false;
showConfirmPassword: boolean = false;

togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
  if (field === 'password') {
    this.showPassword = !this.showPassword;
  } else if (field === 'confirmPassword') {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}


}
