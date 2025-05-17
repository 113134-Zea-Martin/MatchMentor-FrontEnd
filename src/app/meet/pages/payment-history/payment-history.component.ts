import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { PaymentHistoryResponseDTOData } from '../../models/payment-history-response-dto';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css'
})
export class PaymentHistoryComponent implements OnInit, OnDestroy {

  token: string = '';
  userId: number = 0;

  paymentHistory: PaymentHistoryResponseDTOData[] = [];

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.userId = Number(localStorage.getItem('idProfile')) || 0;
    if (this.token && this.userId) {
      this.loadPaymentHistory();
    } else {
      console.error('Token or User ID not found in local storage');
    }
  }

  suscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.suscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  constructor(private paymentService: PaymentService) { }

  loadPaymentHistory() {
    const sus = this.paymentService.getPaymentHistory(this.token, this.userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.allPayments = response.data;
          this.filteredPayments = [...this.allPayments];
        } else {
          console.error('Error fetching payment history:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching payment history:', error);
      }
    });
    this.suscriptions.push(sus);
  }


  showFilters = false;

  filters = {
    counterpart: '',
    description: '',
    startDate: '',
    endDate: '',
    types: {
      Cobro: false,
      Pago: false
    }
  };


  allPayments: PaymentHistoryResponseDTOData[] = [];
  filteredPayments: PaymentHistoryResponseDTOData[] = [];

  applyFilters() {
    const selectedTypes = Object.entries(this.filters.types)
      .filter(([_, selected]) => selected)
      .map(([type]) => type);

    let filtered = this.allPayments.filter(payment => {
      const counterpartMatch = this.filters.counterpart
        ? payment.counterpartName?.toLowerCase().includes(this.filters.counterpart.toLowerCase())
        : true;

      const descriptionMatch = this.filters.description
        ? payment.description?.toLowerCase().includes(this.filters.description.toLowerCase())
        : true;

      const date = new Date(payment.dateTime);
      const startDateMatch = this.filters.startDate
        ? date >= new Date(this.filters.startDate)
        : true;

      const endDateMatch = this.filters.endDate
        ? date <= new Date(this.filters.endDate + 'T23:59:59')
        : true;

      const typeMatch = selectedTypes.length === 0
        ? true
        : selectedTypes.includes(payment.transactionType);

      return counterpartMatch && descriptionMatch && startDateMatch && endDateMatch && typeMatch;
    });

    // Ordenamiento
    if (this.sortColumn !== '') {
      filtered.sort((a, b) => {
        const column = this.sortColumn as keyof PaymentHistoryResponseDTOData;
        const aValue = a[column];
        const bValue = b[column];

        if (aValue == null) return -1;
        if (bValue == null) return 1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const aStr = aValue?.toString().toLowerCase() ?? '';
        const bStr = bValue?.toString().toLowerCase() ?? '';
        return this.sortDirection === 'asc'
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    this.filteredPayments = filtered;
    this.currentPage = 1;
  }



  clearFilters() {
    this.filters = {
      counterpart: '',
      description: '',
      startDate: '',
      endDate: '',
      types: {
        Cobro: false,
        Pago: false
      }
    };
    this.applyFilters();
  }

  // Ordenamiento
  sortColumn: keyof PaymentHistoryResponseDTOData | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Paginación
  currentPage = 1;
  itemsPerPage = 15;

  sortBy(column: keyof PaymentHistoryResponseDTOData) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters(); // volver a aplicar para reordenar
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'bi-chevron-expand';
    return this.sortDirection === 'asc' ? 'bi-chevron-up' : 'bi-chevron-down';
  }

  paginatedPayments(): PaymentHistoryResponseDTOData[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPayments.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  totalPages(): number {
    return Math.ceil(this.filteredPayments.length / this.itemsPerPage);
  }


}
