import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../../profile/models/user-response-dto';
import { CreateMatchResponseDTO, MatchResponseData } from '../models/create-match-response-dto';
import { PendingRequestResponse } from '../models/pending-request-response';
import { ConfirmedMatchResponseDto } from '../models/confirmed-match-response-dto';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private readonly api = environment.apiUrl
  private readonly apiURL = environment.apiUrl + '/match';

  constructor(private http: HttpClient) { }

  getNextTutorCompatibleWithStudent(token: string, studentId: number): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.apiURL}/${studentId}/tutor-compatible-with-student`, { headers: { Authorization: `Bearer ${token}` } });
  }

  createMatch(token: string, studentId: number, tutorId: number, liked: boolean): Observable<CreateMatchResponseDTO> {
    return this.http.post<CreateMatchResponseDTO>(`${this.apiURL}`, { studentId, tutorId, liked }, { headers: { Authorization: `Bearer ${token}` } });
  }

  getPendingMatches(token: string, tutorId: number): Observable<PendingRequestResponse[]> {
    return this.http.get<PendingRequestResponse[]>(`${this.apiURL}/pending-request/${tutorId}`, { headers: { Authorization: `Bearer ${token}` } });
  }

  getStudentProfile(token: string, studentId: number): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.api}/users/${studentId}`, { headers: { Authorization: `Bearer ${token}` } });
  }

  //Metodo para aceptar o rechazar una solicitud de match
  updateMatch(token: string, matchId: number, accepted: boolean): Observable<CreateMatchResponseDTO> {
    if (accepted) {
      return this.http.put<CreateMatchResponseDTO>(`${this.apiURL}/accept/${matchId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    }
    return this.http.put<CreateMatchResponseDTO>(`${this.apiURL}/reject/${matchId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  }

  //Metodo para obtener los matches de un tutor o estudiante
  getConfirmedMatches(token: string, userId: number): Observable<ConfirmedMatchResponseDto[]> {
    return this.http.get<ConfirmedMatchResponseDto[]>(`${this.apiURL}/confirmed/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
  }
}
