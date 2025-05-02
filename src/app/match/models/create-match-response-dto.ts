export interface CreateMatchResponseDTO {
    success:    boolean;
    statusCode: number;
    data:       MatchResponseData;
    message:    string;
    timestamp:  Date;
}

export interface MatchResponseData {
    id:        number;
    studentId: number;
    tutorId:   number;
    status:    string;
    createdAt: Date;
    updatedAt: null;
}
