import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterRequest, UserRegisterResponse } from '../models/user-register-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/api/'; // Replace with your API URL

  // http://localhost:8080/api/auth/register/student
  private readonly REGISTER_URL = `${this.API_URL}auth/register/student`;

  constructor(private http: HttpClient) { }

  // Registro de estudiante
  registerStudent(userRegisterRequest: UserRegisterRequest) : Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(this.REGISTER_URL, userRegisterRequest);
  }
}
