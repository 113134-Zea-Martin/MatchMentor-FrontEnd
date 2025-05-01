import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../models/user-response-dto';
import { Me } from '../models/me';
import { ProfileResponse, StudentProfile, TutorProfile } from '../models/profile-response';
import { InterestResponse } from '../models/interest-response';
import { EditProfileRequest } from '../models/edit-profile-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/users'; // Base URL 
  private api2Url = environment.apiUrl;
  // 
  // for user-related API endpoints
  getUserById(userId: number, token: string): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.apiUrl}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
  }

  // Obtener el usuario mediante el token (se lo envia en el header)
  getUserLogedByToken(token: string): Observable<Me> {
    return this.http.get<Me>(`${this.apiUrl}/me`, { headers: { Authorization: `Bearer ${token}` } });
  }

  // Obtener el usuario mediante el token (se lo envia en el header)
  getProfileByToken(token: string): Observable<ProfileResponse<TutorProfile | StudentProfile>> {
    return this.http.get<ProfileResponse<TutorProfile | StudentProfile>>(`${this.apiUrl}/me/roles`, { headers: { Authorization: `Bearer ${token}` } });
  }

  // Obtener la lista de intereses
  getInterests(token: string): Observable<InterestResponse> {
    return this.http.get<InterestResponse>(`${this.api2Url}/interests/list`, { headers: { Authorization: `Bearer ${token}` } });
  }

  // Actualizar el perfil del usuario
  updateProfile(token: string, userId: number, data: EditProfileRequest): Observable<UserResponseDTO> {
    return this.http.put<UserResponseDTO>(`${this.apiUrl}/${userId}`, data, { headers: { Authorization: `Bearer ${token}` } });
  }
  
}
