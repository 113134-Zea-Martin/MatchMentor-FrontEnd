import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AdminReportService } from '../../admin-report.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TopStudents } from '../../models/consolidated-payment-report';
import { SortByKeyPipe } from "../../sort-by-key.pipe";

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent implements OnInit {

  clearMatchesFilters() {
    this.startDateMatches = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0];
    this.endDateMatches = new Date().toISOString().split('T')[0];
    this.loadMatchesReport();
  }

  constructor(private adminReportService: AdminReportService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.endDateMatches = new Date().toISOString().split('T')[0]; // Fecha actual
    // Establecer la fecha de inicio como 30 días atrás
    this.startDateMatches = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0];
    this.loadMatchesReport();
  }

  token: string = '';
  porcentajeAceptados: number = 0;
  porcentajeRechazados: number = 0;
  porcentajePendientes: number = 0;


  // Variables para el gráfico de torta
  startDateMatches: string = '';
  endDateMatches: string = '';
  totalMatches: number = 0;
  matchesChart: Chart | null = null;

  loadMatchesReport(): void {
    if (!this.startDateMatches || !this.endDateMatches) {
      alert('Por favor, selecciona un rango de fechas.');
      return;
    }

    if (this.matchesChart) {
      this.matchesChart.destroy();
    }

    this.adminReportService.getConsolidatedMatchesReport(this.startDateMatches, this.endDateMatches, this.token).subscribe({
      next: (data) => {
        const { matchesAceptados, matchesPendientes, matchesRechazados, matchesTotales } = data.matchesReport;
        this.totalMatches = matchesTotales;

        if (matchesTotales > 0) {
          this.porcentajeAceptados = Math.round((matchesAceptados / matchesTotales) * 100);
          this.porcentajeRechazados = Math.round((matchesRechazados / matchesTotales) * 100);
          this.porcentajePendientes = Math.round((matchesPendientes / matchesTotales) * 100);
        } else {
          this.porcentajeAceptados = 0;
          this.porcentajeRechazados = 0;
          this.porcentajePendientes = 0;
        }

        const ctx = document.getElementById('matchesChart') as HTMLCanvasElement;
        this.matchesChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Aceptados', 'Pendientes', 'Rechazados'],
            datasets: [{
              data: [matchesAceptados, matchesPendientes, matchesRechazados],
              backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });

        // Convertir rankings a arrays para mostrarlos con *ngFor
        this.topTutors = data.topTutors;
        this.topInterests = data.topInterests;
        console.log('Top Tutors:', this.topTutors);
        console.log('Top Interests:', this.topInterests);
        this.topTutorsArray = Object.entries(this.topTutors)
          .map(([key, value]) => ({ key, value }))
          .sort((a, b) => b.value - a.value); // Ordena de mayor a menor
        this.topInterestsArray = Object.entries(this.topInterests)
          .map(([key, value]) => ({ key, value }))
          .sort((a, b) => b.value - a.value); // Ordena de mayor a menor
      },
      error: (error) => {
        console.error('Error al obtener el reporte de matches:', error);
      }
    });
  }

  topTutorsArray: { key: string, value: number }[] = [];
  topInterestsArray: { key: string, value: number }[] = [];


  topTutors: TopStudents = {};
  topInterests: TopStudents = {};


}
