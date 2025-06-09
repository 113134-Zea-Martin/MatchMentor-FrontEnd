import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { MeetingHistoryResponseDtoData } from '../../models/meeting-history-response-dto';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ConfirmRejectModalComponent } from '../confirm-reject-modal/confirm-reject-modal.component';
import { ConfirmAcceptModalComponent } from '../confirm-accept-modal/confirm-accept-modal.component';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-meeting-history-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmRejectModalComponent, ConfirmAcceptModalComponent],
  templateUrl: './meeting-history-list.component.html',
  styleUrl: './meeting-history-list.component.css'
})
export class MeetingHistoryListComponent implements OnInit, OnDestroy {
  updateEndDateMin(): void {
    // Actualizar mínimo de fecha fin cuando cambia fecha inicio
    this.minEndDate = this.filters.startDate;
    this.applyFilters();
  }

  updateStartDateMax(): void {
    // Actualizar máximo de fecha inicio cuando cambia fecha fin
    this.maxStartDate = this.filters.endDate;
    this.applyFilters();
  }

  // Nueva propiedad para validación
  minEndDate: string = '';
  maxStartDate: string = '';

  handleRejection(meetingId: number) {
    this.updateMeeting(meetingId, false);
  }

  @ViewChild(ConfirmRejectModalComponent) rejectModal!: ConfirmRejectModalComponent;
  @ViewChild(ConfirmAcceptModalComponent) acceptModal!: ConfirmAcceptModalComponent;

  openModal(meetingId: number) {
    this.rejectModal.open(meetingId);
  }

  openAcceptModal(meeting: any) {
    this.acceptModal.open(meeting);
  }

  handleAccept(meetingId: number) {
    this.updateMeeting(meetingId, true);
  }

  meetingHistory: MeetingHistoryResponseDtoData[] = [];
  token: string | null = null;
  userId: string | null = null;

  updateMeeting(meetingId: any, isAccepted: boolean) {
    if (isAccepted) {
      // Generar link de pago
      if (this.token && this.userId) {
        const sus = this.paymentService.getPaymentLink(this.token, meetingId).subscribe({
          next: (response) => {
            if (response) {
              console.log('Link de pago:', response);
              window.open(response, '_blank');
            } else {
              console.error('Error al obtener el link de pago:', response);
            }
          },
          error: (error) => {
            console.error('Error al obtener el link de pago:', error);
          }
        });
        this.subscriptions.push(sus);
      } else {
        console.error('Token or User ID not found in local storage');
      }
    }
    else {
      console.log('token:', this.token);
      console.log('userId:', this.userId);
      const sus = this.meetingService.rejectMeeting(this.token!, meetingId).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Reunión rechazada:', meetingId);
            this.loadMeetingHistory(this.token!, this.userId!);
          } else {
            console.error('Error al rechazar la reunión:', response.message);
          }
        },
        error: (error) => {
          console.error('Error al rechazar la reunión:', error);
        }
      });
      this.subscriptions.push(sus);
      console.log('Reunión rechazada:', meetingId);
    }
  }


  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('idProfile');

    if (this.token && this.userId) {
      this.loadMeetingHistory(this.token, this.userId);
    } else {
      console.error('Token or User ID not found in local storage');
    }

    this.minEndDate = this.filters.startDate; // Inicializar mínimo de fecha fin
    this.maxStartDate = this.filters.endDate; // Inicializar máximo de fecha inicio

  }

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    this.meetingHistory = [];
  }

  constructor(private meetingService: MeetingService, private paymentService: PaymentService) { }

  loadMeetingHistory(token: string, userId: string): void {
    const sus = this.meetingService.getMeetingHistory(token, userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.meetingHistory = response.data;
          this.originalMeetingHistory = [...response.data];
          this.sortMeetingHistory();
          this.filteredMeetings = [...this.meetingHistory];
          this.autoRejectExpiredMeetings();
        } else {
          console.error('Error fetching meeting history:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching meeting history:', error);
      }
    });
    this.subscriptions.push(sus);
  }

  autoRejectExpiredMeetings(): void {
    const currentDate = new Date();
    console.log('Current date:', currentDate);
    for (const meeting of this.meetingHistory) {
      const meetingDate = new Date(meeting.date);
      const timeDate = new Date(`${meeting.date}T${meeting.time}`);
      console.log('Time date:', timeDate);
      // Sumar 1 día a la fecha de la reunión para incluir todo el día
      meetingDate.setDate(meetingDate.getDate() + 1);

      console.log('Meeting date:', meetingDate);
      // Verificar si la reunión es del pasado y está pendiente
      if (timeDate < currentDate && meeting.status === 'PROPOSED') {
        console.log('Reunión vencida encontrada:', meeting);
        // // Rechazar automáticamente la reunión
        this.updateMeeting(meeting.id, false);
      }
    }
  }

  sortMeetingHistory(): void {
    this.meetingHistory.sort((a, b) => {
      // Ordenar por fecha descendente
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      // Si las fechas son iguales, ordenar por hora descendente
      const timeA = a.time;
      const timeB = b.time;
      if (timeA < timeB) {
        return 1;
      }
      if (timeA > timeB) {
        return -1;
      }
      return 0;
    });
    // Actualizar filteredMeetings después de ordenar
    this.filteredMeetings = [...this.meetingHistory];
  }

  sortField: string = 'date';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortBy(field: string) {
    // Si ya estamos ordenando por este campo, invertimos la dirección
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc'; // Por defecto ascendente al cambiar de campo
    }

    // Ordenar meetings dependiendo del tipo de campo
    this.filteredMeetings.sort((a, b) => {
      let valueA, valueB;

      // Manejo especial para fechas
      if (field === 'date') {
        valueA = new Date(a.date);
        valueB = new Date(b.date);
      } else {
        valueA = (a as any)[field];
        valueB = (b as any)[field];

        // Para campos de texto, usar minúsculas para ordenar
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }
      }

      // Lógica de comparación y dirección
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Actualizar la paginación
    this.page = 1;
  }


  originalMeetingHistory: MeetingHistoryResponseDtoData[] = [];

  filters = {
    participant: '',
    reason: '',
    startDate: '',
    endDate: '',
    status: {
      PROPOSED: false,
      ACCEPTED: false,
      REJECTED: false
    },
    role: {
      Estudiante: false,
      Mentor: false
    }
  };

  applyFilters() {
    let result = [...this.meetingHistory]; // tu lista original de reuniones

    // Filtros de texto
    if (this.filters.participant)
      result = result.filter(m => m.otherParticipantName?.toLowerCase().includes(this.filters.participant.toLowerCase()));
    if (this.filters.reason)
      result = result.filter(m => m.reason?.toLowerCase().includes(this.filters.reason.toLowerCase()));

    // Filtros de fecha
    if (this.filters.startDate)
      result = result.filter(m => new Date(m.date) >= new Date(this.filters.startDate));
    if (this.filters.endDate)
      result = result.filter(m => new Date(m.date) <= new Date(this.filters.endDate));

    // Filtros de estado
    const selectedStatuses = Object.entries(this.filters.status).filter(([_, v]) => v).map(([k]) => k);
    if (selectedStatuses.length)
      result = result.filter(m => selectedStatuses.includes(m.status));

    // Filtros de rol
    const selectedRoles = Object.entries(this.filters.role).filter(([_, v]) => v).map(([k]) => k);
    if (selectedRoles.length)
      result = result.filter(m => selectedRoles.includes(m.myRole));

    this.filteredMeetings = result;
    this.page = 1; // reiniciar a la primera página
  }

  get totalPages() {
    return Math.ceil(this.filteredMeetings.length / this.pageSize);
  }

  clearFilters(): void {
    this.filters = {
      participant: '',
      reason: '',
      startDate: '',
      endDate: '',
      status: {
        PROPOSED: false,
        ACCEPTED: false,
        REJECTED: false
      },
      role: {
        Estudiante: false,
        Mentor: false
      }
    };
    // Restablecer límites
    this.minEndDate = this.filters.startDate;
    this.maxStartDate = this.filters.endDate;
    this.meetingHistory = [...this.originalMeetingHistory];
    // this.sortBy(this.sortField || 'date');
    this.sortMeetingHistory();
  }

  showFilters = false;

  page = 1;
  pageSize = 15; // Número de reuniones por página
  filteredMeetings: any[] = []; // Resultado de applyFilters()

  get paginatedMeetings() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredMeetings.slice(start, start + this.pageSize);
  }

}
