import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../models/user-response-dto';
import { Me } from '../models/me';
import { ProfileResponse, StudentProfile, TutorProfile } from '../models/profile-response';
import { InterestResponse } from '../models/interest-response';
import { EditProfileRequest } from '../models/edit-profile-request';
import { PostCreateMpDto, PostMercadoPagoAuth, PostMercadoPagoAuthResponse } from '../models/post-create-mp-dto';

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

  //   @PostMapping("/create")
  // public String create(@RequestBody CreateMercadoPagoAuthDTO createMercadoPagoAuthDTO) {
  //     return mercadoPagoAuthService.getURL(createMercadoPagoAuthDTO);
  // }
  postMercadoPagoLink(token: string, data: PostCreateMpDto): Observable<String> {
    return this.http.post<String>(`${this.api2Url}/mercadoPagoAuth/create`, data, { headers: { Authorization: `Bearer ${token}` } });
  }


  // En user.service.ts
  postMercadoPagoLink2(token: string, data: { userId: number }): Observable<string> {
    return this.http.post('http://localhost:8080/api/mercadoPagoAuth/create',
      data,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }),
        responseType: 'text'  // Esta es la clave - especifica que la respuesta es texto
      }
    );
  }

  PostMercadoPagoAuth(token: string, data: { code: string, userId: number }): Observable<PostMercadoPagoAuthResponse> {
    return this.http.post<PostMercadoPagoAuthResponse>(`${this.api2Url}/mercadoPagoAuth`, data, { headers: { Authorization: `Bearer ${token}` } });
  }
}
