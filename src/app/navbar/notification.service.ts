import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { NotificationResponse } from './notification-response';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly notificationUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient, private router: Router) {
    // Verificar notificaciones en cada cambio de ruta
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd) // Solo nos interesa NavigationEnd
      )
      .subscribe(() => {
        const userId = JSON.parse(localStorage.getItem('idProfile') || '{}');
        if (userId) {
          this.hasUnreadNotifications(userId).subscribe(); // Dispara la verificación
        }
      });
  }

  private hasnewNotifications = new BehaviorSubject<boolean>(false);
  public hasNewNotifications$ = this.hasnewNotifications.asObservable();

  // Check for unread notifications
  hasUnreadNotifications(userId: number): Observable<boolean> {
    return new Observable(observer => {
      this.http.get<boolean>(`${this.notificationUrl}/${userId}/unread`)
        .subscribe({
          next: (response) => {
            this.hasnewNotifications.next(response);
            observer.next(response);
            observer.complete();
          },
          error: (error) => {
            console.error('Error checking unread notifications:', error);
          }
        });
    });
  }


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