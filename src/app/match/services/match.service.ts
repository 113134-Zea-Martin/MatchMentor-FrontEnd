import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../../profile/models/user-response-dto';
import { CreateMatchResponseDTO } from '../models/create-match-response-dto';
import { PendingRequestResponse } from '../models/pending-request-response';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

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
    return this.http.get<UserResponseDTO>(`${environment.apiUrl}/users/${studentId}`, { headers: { Authorization: `Bearer ${token}` } });
  }

}
