import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

declare var bootstrap: any; // Para interactuar con los modales de Bootstrap

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

    subscriptions: Subscription[] = [];

    success: boolean = false;
    message: string = '';

    successModal: any;
    errorModal: any;

    showPassword = false;
    showConfirmPassword = false;

    // Creamos el estudiante
    onSubmit() {
        if (this.registerForm.valid) {
            const userRegisterRequest = {
                firstName: this.registerForm.value.firstName!,
                lastName: this.registerForm.value.lastName!,
                email: this.registerForm.value.email!,
                password: this.registerForm.value.password!,
                interests: this.registerForm.value.interests
            };
            console.log(userRegisterRequest);

            const susbcription = this.authService.registerStudent(userRegisterRequest).subscribe({
                next: (response) => {
                    this.success = response.success;
                    this.message = response.message;
                    console.log('Registro exitoso', response.message);
                    this.successModal.show();
                    // Aquí ya no necesitamos redirigir inmediatamente, el modal lo hará al cerrarse
                },
                error: (error) => {
                    // El error.error contiene la respuesta real de tu API cuando hay un error HTTP
                    if (error.error) {
                        this.success = error.error.success;
                        this.message = error.error.message;
                        console.error('Error en el registro:', error.error.message);
                    } else {
                        this.success = false;
                        this.message = 'Error en la conexión con el servidor';
                        console.error('Error de conexión:', error);
                    }
                    this.errorModal.show();
                }
            });
            this.subscriptions.push(susbcription); // Guardamos la suscripción para poder cancelarla si es necesario
        } else {
            console.log('Formulario inválido');
        }
    }

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
        this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

        const successModalElement = document.getElementById('successModal');
        if (successModalElement) {
            successModalElement.addEventListener('hidden.bs.modal', () => {
                this.navigateToLogin();
            });
        }
    }

    ngOnDestroy(): void {
        // Cancelar todas las suscripciones al destruir el componente
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = []; // Limpiar el array de suscripciones
    }

    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        return password && confirmPassword && password.value !== confirmPassword.value
            ? { mismatch: true }
            : null;
    };

    registerForm: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        terms: new FormControl(false, [Validators.requiredTrue]),
    }, { validators: this.passwordMatchValidator }
    );

    navigateToLogin() {
        this.router.navigate(['/auth/login']);
    }

    togglePasswordVisibility(inputId: string) {
        if (inputId === 'password') {
            this.showPassword = !this.showPassword;
        } else if (inputId === 'confirmPassword') {
            this.showConfirmPassword = !this.showConfirmPassword;
        }
    }
}