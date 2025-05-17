import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { PaymentHistoryResponseDTO } from '../models/payment-history-response-dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  private readonly apiURLPayment = environment.apiUrl + '/payment';
  private readonly apiURLMercadoPago = environment.apiUrl + '/payment/mercadopago';
  
  // Obtener link de pago para aceptar reunión
  getPaymentLink(token: string, meetingId: number): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // La clave está en el 'responseType: "text"'
    return this.http.get<string>(
      `${this.apiURLMercadoPago}/${meetingId}`, 
      { 
        headers, 
        responseType: 'text' as 'json' // Este cast es necesario por una limitación en TypeScript
      }
    );
  }

  // Obtener historial de pagos
  getPaymentHistory(token: string, userId: number): Observable<PaymentHistoryResponseDTO> {
    return this.http.get<PaymentHistoryResponseDTO>(`${this.apiURLPayment}/history/${userId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

}
