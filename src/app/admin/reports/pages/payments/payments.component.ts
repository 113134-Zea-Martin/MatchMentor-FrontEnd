import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { DailyPayments, TopStudents, PaymentsByStatus } from '../../models/consolidated-payment-report';
import { AdminReportService } from '../../admin-report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortByKeyPipe } from "../../sort-by-key.pipe";

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, SortByKeyPipe],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit, OnDestroy {

  filterStartDate: string = '';
  filterEndDate: string = '';
  token: string = '';

  dailyPaymentsData: DailyPayments = {};
  topStudentsData: TopStudents = {};
  paymentsByStatusData: PaymentsByStatus | null = null;

  paymentsChart: Chart | null = null;
  private dataSubscription: Subscription | undefined;

  constructor(private paymentReportService: AdminReportService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';

    Chart.register(...registerables); // Registrar componentes de Chart.js

    // Inicializar fechas con un rango por defecto (ej. últimos 7 días)
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6); // Seis días antes de hoy para incluir hoy

    this.filterEndDate = this.formatDate(today);
    this.filterStartDate = this.formatDate(sevenDaysAgo);

    this.loadReportData();
  }

  ngOnDestroy(): void {
    if (this.paymentsChart) {
      this.paymentsChart.destroy();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Desuscribirse para evitar fugas de memoria
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  loadReportData(): void {
    if (!this.filterStartDate || !this.filterEndDate) {
      alert('Por favor, selecciona un rango de fechas válido.');
      return;
    }

    // Cancelar la suscripción anterior si existe
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.dataSubscription = this.paymentReportService.getConsolidatedReport(
      this.filterStartDate,
      this.filterEndDate,
      this.token
    ).subscribe(
      (data) => {
        this.dailyPaymentsData = data.dailyPayments;
        this.topStudentsData = data.topStudents;
        this.paymentsByStatusData = data.paymentsByStatus;
        this.renderPaymentsChart();
      },
      (error) => {
        console.error('Error al cargar el reporte de pagos:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }

  applyFilters(): void {
    this.loadReportData();
  }

  clearFilters(): void {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    this.filterEndDate = this.formatDate(today);
    this.filterStartDate = this.formatDate(sevenDaysAgo);
    this.loadReportData();
  }

  renderPaymentsChart(): void {
    if (this.paymentsChart) {
      this.paymentsChart.destroy();
    }

    const ctx = document.getElementById('paymentsChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error("Canvas element 'paymentsChart' not found.");
      return;
    }

    const labels = Object.keys(this.dailyPaymentsData).sort(); // Ordenar las fechas
    const dataValues = labels.map(label => this.dailyPaymentsData[label]);

    const chartData: ChartData<'bar'> = {
      labels: labels,
      datasets: [{
        label: 'Ingresos Diarios',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    const chartOptions: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false, // Permite que el gráfico se adapte al contenedor
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Monto ($)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Fecha'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Evolución Diaria de Ingresos'
        }
      }
    };

    this.paymentsChart = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico: barras
      data: chartData,
      options: chartOptions
    });
  }
}