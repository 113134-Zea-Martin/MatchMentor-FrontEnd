export interface PaymentHistoryResponseDTO {
    success:    boolean;
    statusCode: number;
    data:       PaymentHistoryResponseDTOData[];
    message:    string;
    timestamp:  Date;
}

export interface PaymentHistoryResponseDTOData {
    id:              number;
    dateTime:        Date;
    amount:          number;
    paymentStatus:   string;
    transactionType: string;
    counterpartName: string;
    description:     string;
    paymentMethod:   string;
    transactionId:   string;
    mercadoPagoFee:  number;
    platformFee:     number;
}
