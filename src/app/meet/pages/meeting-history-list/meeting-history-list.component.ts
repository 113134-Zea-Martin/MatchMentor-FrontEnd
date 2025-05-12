import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { MeetingHistoryResponseDtoData } from '../../models/meeting-history-response-dto';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meeting-history-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meeting-history-list.component.html',
  styleUrl: './meeting-history-list.component.css'
})
export class MeetingHistoryListComponent implements OnInit, OnDestroy {

  meetingHistory: MeetingHistoryResponseDtoData[] = [];
  token: string | null = null;
  userId: string | null = null;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('idProfile');

    if (this.token && this.userId) {
      this.loadMeetingHistory(this.token, this.userId);
    } else {
      console.error('Token or User ID not found in local storage');
    }
  }

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    this.meetingHistory = [];
  }

  constructor(private meetingService: MeetingService) { }

  loadMeetingHistory(token: string, userId: string): void {
    const sus = this.meetingService.getMeetingHistory(token, userId).subscribe({
      next: (response) => {
        if (response.success) {
      this.meetingHistory = response.data;
        this.originalMeetingHistory = [...response.data];
        this.sortMeetingHistory();
        this.filteredMeetings = [...this.meetingHistory];
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

  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.meetingHistory.sort((a, b) => {
      const valueA = (a as any)[field];
      const valueB = (b as any)[field];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
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

  // applyFilters(): void {
  //   this.meetingHistory = this.originalMeetingHistory.filter(meeting => {
  //     const matchParticipant = this.filters.participant === '' ||
  //       meeting.otherParticipantName.toLowerCase().includes(this.filters.participant.toLowerCase());

  //     const matchReason = this.filters.reason === '' ||
  //       meeting.reason.toLowerCase().includes(this.filters.reason.toLowerCase());

  //     const meetingDate = new Date(meeting.date);
  //     const matchStartDate = !this.filters.startDate || new Date(this.filters.startDate) <= meetingDate;
  //     const matchEndDate = !this.filters.endDate || new Date(this.filters.endDate) >= meetingDate;

  //     const matchStatus = !Object.values(this.filters.status).includes(true) ||
  //       this.filters.status[meeting.status as keyof typeof this.filters.status];

  //     const matchRole = !Object.values(this.filters.role).includes(true) ||
  //       this.filters.role[meeting.otherParticipantRole.toUpperCase() as keyof typeof this.filters.role];

  //     return matchParticipant && matchReason && matchStartDate && matchEndDate && matchStatus && matchRole;
  //   });

  //   this.sortBy(this.sortField || 'date');
  // }

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
