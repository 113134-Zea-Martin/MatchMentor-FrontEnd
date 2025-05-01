import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  // Propiedades del componente
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  showPassword = false;
  message: string = '';
  isLoading: boolean = false;
  errorModal: any;
  
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.errorModal = new bootstrap.Modal(document.getElementById('errorModal')!);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    if (this.loginForm.valid) {
      const email = this.loginForm.value.email!;
      const password = this.loginForm.value.password!;

      const loginSub = this.authService.loginUser(email, password).subscribe({
        next: (response) => {
          console.log(response.message);
          
          if (response.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('idProfile', response.data.id.toString());
            this.router.navigate(['/home']);
          } else {
            this.message = response.message;
            console.error('Error en el login:', response.message);
            this.errorModal.show();
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.message = 'Error en el servidor: \n Intente más tarde.';
          this.errorModal.show();
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });

      this.subscriptions.push(loginSub);
    }
  }
}