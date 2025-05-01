import { Component, OnDestroy, OnInit } from '@angular/core';
import { PendingRequestResponse } from '../../models/pending-request-response';
import { MatchService } from '../../services/match.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css'
})
export class PendingComponent implements OnInit, OnDestroy {


  viewDetails(matchId: number, studentId: number) {
    localStorage.setItem('idStudent', studentId.toString());
    console.log('ID del estudiante:', studentId);
    localStorage.setItem('idMatch', matchId.toString());
    console.log('ID del match:', matchId);
    this.router.navigate(['/explore/students']); // Navegar a la ruta del perfil del estudiante
  }
  acceptRequest(arg0: number) {
    throw new Error('Method not implemented.');
  }
  rejectRequest(arg0: number) {
    throw new Error('Method not implemented.');
  }

  token?: string;
  tutorId?: number;
  pendingRequestResponse: PendingRequestResponse[] = [];

  pagedRequests: PendingRequestResponse[] = [];
  currentPage = 1;
  pageSize = 3; // cuántos mostrar por página
  totalPages = 0;

  constructor(private matchService: MatchService, private router: Router) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.tutorId = Number(localStorage.getItem('idProfile')) || 0;
    console.log('token:', this.token);
    console.log('tutorId:', this.tutorId);
    this.loadPendingMatches();
  }

  subscritions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscritions.forEach((subscription) => subscription.unsubscribe());
  }

  loadPendingMatches(): void {
    if (this.token && this.tutorId) {
      const sub = this.matchService.getPendingMatches(this.token, this.tutorId).subscribe({
        next: (response) => {
          this.pendingRequestResponse = response;
          console.log('Pending matches:', this.pendingRequestResponse);
          this.updatePagination();
        },
        error: (error) => {
          console.error('Error fetching pending matches:', error);
        }
      });
      this.subscritions.push(sub);
    };
  }

  updatePagination() {
    // Protección contra null o undefined
    if (!this.pendingRequestResponse || this.pendingRequestResponse.length === 0) {
      console.log('No hay elementos para paginar');
      this.totalPages = 0;
      this.pagedRequests = [];
      return;
    }

    this.totalPages = Math.ceil(this.pendingRequestResponse.length / this.pageSize);

    // Asegurar que currentPage es válido
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.pendingRequestResponse.length);
    this.pagedRequests = this.pendingRequestResponse.slice(startIndex, endIndex);

    console.log(`Paginación actualizada: Página ${this.currentPage} de ${this.totalPages}`);
    console.log(`Mostrando elementos del ${startIndex + 1} al ${endIndex} de ${this.pendingRequestResponse.length}`);
    console.log('Elementos en la página actual:', this.pagedRequests);
  }

  get totalPagesArray() {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}

