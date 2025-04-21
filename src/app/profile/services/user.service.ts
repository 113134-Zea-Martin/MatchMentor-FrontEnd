import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../models/user-response-dto';
import { Me } from '../models/me';
import { ProfileResponse, StudentProfile, TutorProfile } from '../models/profile-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/users'; // Base URL 
  // 
  // for user-related API endpoints
  getUserById(userId: number): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.apiUrl}/${userId}`);
  }

  // Obtener el usuario mediante el token (se lo envia en el header)
  getUserLogedByToken(token: string): Observable<Me> {
    return this.http.get<Me>(`${this.apiUrl}/me`, { headers: { Authorization: `Bearer ${token}` } });
  }

  // Obtener el usuario mediante el token (se lo envia en el header)
  getProfileByToken(token: string): Observable<ProfileResponse<TutorProfile | StudentProfile>> {
    return this.http.get<ProfileResponse<TutorProfile | StudentProfile>>(`${this.apiUrl}/me/roles`, { headers: { Authorization: `Bearer ${token}` } });
  }
  
}
