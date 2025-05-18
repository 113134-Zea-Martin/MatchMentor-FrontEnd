import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterRequest, UserRegisterResponse } from '../models/user-register-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLoginResponse } from '../models/user-login-request';
import { ForgotPasswordResponse } from '../models/forgot-passowrd-response';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // Add BehaviorSubject for user role and authentication status
  private currentUserRole = new BehaviorSubject<string | null>(null);
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private userId = new BehaviorSubject<number | null>(null);
  
  // Expose as observables for components to subscribe
  public userRole$ = this.currentUserRole.asObservable();
  public loggedIn$ = this.isLoggedIn.asObservable();
  public userId$ = this.userId.asObservable();

  // private readonly API_URL = 'http://localhost:8080/api/auth/'; // Replace with your API URL
  private readonly API_URL = environment.apiUrl + '/auth/'; // Base URL for authentication-related API endpoints

  // http://localhost:8080/api/auth/register/user
  private readonly REGISTER_URL = `${this.API_URL}register/user`;

  constructor(private http: HttpClient) { 
    // Initialize state from localStorage
    this.checkAuthState();
  }

  public getCurrentUserRole() {
    return this.userRole$;
  }

  // Check authentication state on service initialization
  private checkAuthState(): void {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (token) {
      this.isLoggedIn.next(true);
      if (role) {
        this.currentUserRole.next(role);
      }
    }
  }

  // Registro de usuario
  registerUser(userRegisterRequest: UserRegisterRequest): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(this.REGISTER_URL, userRegisterRequest);
  }

  // Login del usuario
  // Login del usuario - modified to store role information
  loginUser(email: string, password: string): Observable<UserLoginResponse> {
    const loginUrl = `${this.API_URL}login`;
    return new Observable(observer => {
      this.http.post<UserLoginResponse>(loginUrl, { email, password })
        .subscribe({
          next: (response) => {
            // Store token and role information
            localStorage.setItem('token', response.data.token);
            if (response.data.role) {
              localStorage.setItem('userRole', response.data.role);
              this.currentUserRole.next(response.data.role);
              this.userId.next(response.data.id);
            }
            this.isLoggedIn.next(true);
            observer.next(response);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          }
        });
    });
  }

  updateUserRole(role: string): void {
  localStorage.setItem('userRole', role);
  this.currentUserRole.next(role);
}

  // Método para solicitar el restablecimiento de contraseña
  requestPasswordReset(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.API_URL}request-reset?email=${email}`, {
      params: { email }
    });
  }

  // Método para restablecer la contraseña
  resetPassword(token: string, newPassword: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.API_URL}reset-password`, {
      token,
      newPassword
    });
  }

  logout(): void {
    // Eliminar el token del almacenamiento local o de la sesión
    localStorage.removeItem('token');
    // Remover todo el almacenamiento local o de la sesión
    localStorage.clear(); // Descomentar si se desea limpiar todo el almacenamiento de sesión
  }

  isAuthenticated(): boolean {
    // Verifica si el token de autenticación está presente en el almacenamiento local o de la sesión
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe, false en caso contrario
  }

}
