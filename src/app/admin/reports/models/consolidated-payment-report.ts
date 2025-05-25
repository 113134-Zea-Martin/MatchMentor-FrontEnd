export interface ConsolidatedPaymentReport {
    topStudents: TopStudents;
    dailyPayments: DailyPayments;
    paymentsByStatus: PaymentsByStatus;
}
export interface TopStudents {
    [studentName: string]: number; // Ej: { "Lucía Fernández": 12, "Martín González": 8 }
}

export interface DailyPayments {
    [date: string]: number; // Ej: { "2025-05-20": 5, "2025-05-21": 15 }
}

export interface PaymentsByStatus {
    totalApprovedPayments: number;
    totalApprovedSum: number;
    averageApprovedPayment: number;
}