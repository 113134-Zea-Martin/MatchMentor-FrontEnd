import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { NotificationResponse } from './notification-response';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly notificationUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) { }

  getlast10Notifications(userId: number, token: string): Observable<NotificationResponse> {
    return this.http.get<NotificationResponse>(`${this.notificationUrl}/${userId}?isTop10=true`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllNotifications(userId: number, token: string): Observable<NotificationResponse> {
    return this.http.get<NotificationResponse>(`${this.notificationUrl}/${userId}?isTop10=false`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  markAsRead(notificationId: number, token: string): Observable<NotificationResponse> {
    return this.http.put<NotificationResponse>(`${this.notificationUrl}/${notificationId}/read`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}