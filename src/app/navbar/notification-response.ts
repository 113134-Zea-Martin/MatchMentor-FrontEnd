export interface NotificationResponse {
    success:    boolean;
    statusCode: number;
    data:       NotificationResponseDatum[];
    message:    string;
    timestamp:  Date;
}

export interface NotificationResponseDatum {
    id:               number;
    userId:           number;
    notificationType: string;
    message:          string;
    createdAt:        Date;
    isRead:           boolean;
    readedAt:         null;
    relatedEntityId:  number;
}
