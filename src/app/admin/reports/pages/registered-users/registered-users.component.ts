import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminReportService } from '../../admin-report.service';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-registered-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registered-users.component.html',
  styleUrl: './registered-users.component.css'
})
export class RegisteredUsersReportComponent implements OnInit, OnDestroy {
  totalUsers: number = 0;
  growthRate: number | null = null; // Tasa de crecimiento en porcentaje
  monthlyEvolutionData: { labels: string[]; data: number[] } = { labels: [], data: [] }; // Se mantiene para compatibilidad con Chart.js
  chart: Chart | null = null;

  // Variables para los filtros
  filterInterval: string = 'DAY'; // Default a dia
  filterStartDate: string = '';
  filterEndDate: string = '';
  filterRole: string = '';

  constructor(private adminReportService: AdminReportService) { }

  ngOnInit(): void {
    // Inicializa las fechas con un rango por defecto (ej. últimos 6 meses)
    const today = new Date();
    const oneMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Primer día de hace 6 meses
    const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7); // Hace una semana

    this.filterEndDate = this.formatDate(today);
    this.filterStartDate = this.formatDate(oneWeekAgo);

    this.loadRegisteredUsersReport();
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  suscriptions: Subscription[] = [];

  loadRegisteredUsersReport(): void {
    if (this.chart) {
      this.chart.destroy(); // Destruir el gráfico anterior si existe
    }

    // Validar que las fechas estén seleccionadas antes de llamar
    if (!this.filterStartDate || !this.filterEndDate) {
      alert('Por favor, selecciona un rango de fechas.');
      return;
    }

    const sus = this.adminReportService.getRegisteredUsersReport(
      this.filterInterval,
      this.filterStartDate,
      this.filterEndDate,
      this.filterRole
    ).subscribe({
      next: (data) => {
        this.totalUsers = data.totalUsers;
        this.growthRate = data.growth; // Tasa de crecimiento en porcentaje
        // Mapear los datos de evolución para Chart.js
        this.monthlyEvolutionData.labels = data.evolutionData.map(item => item.period);
        this.monthlyEvolutionData.data = data.evolutionData.map(item => item.count);


        this.renderChart();
      },
      error: (error) => {
        console.error('Error al obtener el reporte de usuarios:', error);
        // Manejar el error
      }
    }
    );

    this.suscriptions.push(sus);
  }

  applyFilters(): void {
    this.loadRegisteredUsersReport();
  }

  clearFilters(): void {
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);

    this.filterStartDate = this.formatDate(sixMonthsAgo);
    this.filterEndDate = this.formatDate(today);
    this.filterInterval = 'MONTH';
    this.filterRole = '';
    this.loadRegisteredUsersReport();
  }

  renderChart(): void {
    const ctx = document.getElementById('usersChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar', // 'bar' o 'line'
      data: {
        labels: this.monthlyEvolutionData.labels,
        datasets: [{
          // label: `Usuarios Registrados por ${this.filterInterval}`,
          // Si es DAY, mostrar el intervalo como "Día", si es MONTH como "Mes" y si es WEEK como "Semana"
          label: `Usuarios Registrados por ${this.filterInterval === 'DAY' ? 'Día' : this.filterInterval === 'MONTH' ? 'Mes' : 'Semana'}`,
          data: this.monthlyEvolutionData.data,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de Usuarios'
            },
            ticks: {
              stepSize: 1 // Asegura que los ticks sean números enteros para conteos
            }
          },
          x: {
            title: {
              display: true,
              text: 'Período'
            }
          }
        },
        plugins: {
          legend: {
            display: true // Mostrar la leyenda para indicar el intervalo
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    // Destruir todas las suscripciones
    this.suscriptions.forEach(s => s.unsubscribe());
    this.suscriptions = [];
  }

}