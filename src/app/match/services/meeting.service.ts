import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { CreateMeetingRequestDto, CreateMeetingRsponsetDto } from '../models/create-meeting-request-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }

  private readonly apiURL = environment.apiUrl + '/meeting';

  createMeeting(token: string, createMeetingRequest: CreateMeetingRequestDto) : Observable<CreateMeetingRsponsetDto> {
    return this.http.post<CreateMeetingRsponsetDto>(this.apiURL, createMeetingRequest, { headers: { Authorization: `Bearer ${token}` } });
  }
}
