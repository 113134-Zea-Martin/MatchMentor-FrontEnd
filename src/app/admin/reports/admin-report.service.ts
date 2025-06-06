import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RegisteredUsersReport } from './models/registered-users-report';
import { forkJoin, map, Observable } from 'rxjs';
import { MatchesReport } from './models/matches-report';
import { TopStudents, DailyPayments, PaymentsByStatus, ConsolidatedPaymentReport } from './models/consolidated-payment-report';

@Injectable({
  providedIn: 'root'
})
export class AdminReportService {

  private readonly API_URL = environment.apiUrl + '/admin/report';

  constructor(private http: HttpClient) { }

  // getRegisteredUsersReport(interval: string, startDate: string, endDate: string, role?: string): Observable<RegisteredUsersReport> {
  //   let params = new HttpParams()
  //     .set('interval', interval)
  //     .set('startDate', startDate)
  //     .set('endDate', endDate);

  //   if (role) {
  //     params = params.set('role', role);
  //   }
  //   return this.http.get<RegisteredUsersReport>(`${this.API_URL}/users`, { params });
  // }

    getRegisteredUsersReport(interval: string, startDate: string, endDate: string, token: string, role?: string): Observable<RegisteredUsersReport> {
    let params = new HttpParams()
      .set('interval', interval)
      .set('startDate', startDate)
      .set('endDate', endDate);

    if (role) {
      params = params.set('role', role);
    }
    return this.http.get<RegisteredUsersReport>(`${this.API_URL}/users`, { params , headers: { Authorization: `Bearer ${token}` } });
  }

  // Métodos para obtener el reporte de matches

  getMatchesReport(startDate: string, endDate: string, token: string): Observable<MatchesReport> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any>(`${this.API_URL}/matches`, { params, headers: { Authorization: `Bearer ${token}` } });
  }

  getTopTutors(startDate: string, endDate: string, token: string): Observable<TopStudents> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<TopStudents>(`${this.API_URL}/top-tutors`, { params, headers: { Authorization: `Bearer ${token}` } });
  }

  getTopInterests(startDate: string, endDate: string, token: string): Observable<TopStudents> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<TopStudents>(`${this.API_URL}/top-interests`, { params, headers: { Authorization: `Bearer ${token}` } });
  }

  // Método para obtener el reporte consolidado de matches
  getConsolidatedMatchesReport(startDate: string, endDate: string, token: string): Observable<any> {
    return forkJoin({
      topTutors: this.getTopTutors(startDate, endDate, token),
      topInterests: this.getTopInterests(startDate, endDate, token),
      matchesReport: this.getMatchesReport(startDate, endDate, token)
    }).pipe(
      map(results => {
        return {
          topTutors: results.topTutors,
          topInterests: results.topInterests,
          matchesReport: results.matchesReport
        };
      })
    );
  }

  // Métodos para el reporte de pagos consolidados

  getTopStudents(startDate: string, endDate: string, token: string): Observable<TopStudents> {
    let params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<TopStudents>(`${this.API_URL}/top-students`, { params, headers: { Authorization: `Bearer ${token}` } });
  }

  getDailyPayments(startDate: string, endDate: string, token: string): Observable<DailyPayments> {
    let params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<DailyPayments>(`${this.API_URL}/payments`, { params, headers: { Authorization: `Bearer ${token}` } });
  }

  getPaymentsByStatus(startDate: string, endDate: string, token: string): Observable<PaymentsByStatus> {
    let params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<PaymentsByStatus>(`${this.API_URL}/payments-by-status`, { params, headers: { Authorization: `Bearer ${token}` } });
  }

  // Método para obtener todos los datos del reporte de una vez
  getConsolidatedReport(startDate: string, endDate: string, token: string): Observable<ConsolidatedPaymentReport> {
    return forkJoin({
      topStudents: this.getTopStudents(startDate, endDate, token),
      dailyPayments: this.getDailyPayments(startDate, endDate, token),
      paymentsByStatus: this.getPaymentsByStatus(startDate, endDate, token)
    }).pipe(
      map(results => {
        return {
          topStudents: results.topStudents,
          dailyPayments: results.dailyPayments,
          paymentsByStatus: results.paymentsByStatus
        };
      })
    );
  }
}
