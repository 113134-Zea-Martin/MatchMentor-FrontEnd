import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  private readonly API_URL = environment.apiUrl + '/user-activity'; // Base URL for user activity-related API endpoints
  private readonly BASE_URL = environment.apiUrl; // Base URL for the API
  private readonly NOTIFICATIONS_URL = `${this.BASE_URL}/notifications`; // Base URL for notifications


  constructor(private http: HttpClient, private router: Router) { 
    this.trackNavigation();
  }

  // Track user navigation
  private trackNavigation() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Obtener datos del usuario desde localStorage
        const userId = localStorage.getItem('idProfile');
        const eventUrl = event.url;
        // Reemplazar el primer '/' por '%2F'
        const modifiedUrl = eventUrl.replace('/', '%2F');
        
        if (userId) {
          // Enviar registro de actividad al backend (http://localhost:8080/api/user-activity?userId=6&activityId=%2Fmeet)
          this.http.post(this.API_URL + '?userId=' + userId + "" + "&activityId=" + modifiedUrl, { }).subscribe(); // No manejamos errores para no interrumpir la navegación
        }
      }
    });
  }

}
