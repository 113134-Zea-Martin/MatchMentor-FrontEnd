import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { MeetingHistoryResponseDto } from '../models/meeting-history-response-dto';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }

  private readonly apiURL = environment.apiUrl + '/meeting';

  getMeetingHistory(token: string, userId: string): Observable<MeetingHistoryResponseDto> {
    return this.http.get<MeetingHistoryResponseDto>(`${this.apiURL}/history/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
  }

  // Rechazar una reunión
  rejectMeeting(token: string, meetingId: string): Observable<MeetingHistoryResponseDto> {
    return this.http.put<MeetingHistoryResponseDto>(`${this.apiURL}/reject/${meetingId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  }

}
