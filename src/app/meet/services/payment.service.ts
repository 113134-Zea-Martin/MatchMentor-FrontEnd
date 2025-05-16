import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  private readonly apiURL = environment.apiUrl + '/payment/mercadopago';
  
  // Obtener link de pago para aceptar reunión
  getPaymentLink(token: string, meetingId: number): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // La clave está en el 'responseType: "text"'
    return this.http.get<string>(
      `${environment.apiUrl}/payment/mercadopago/${meetingId}`, 
      { 
        headers, 
        responseType: 'text' as 'json' // Este cast es necesario por una limitación en TypeScript
      }
    );
  }

}
