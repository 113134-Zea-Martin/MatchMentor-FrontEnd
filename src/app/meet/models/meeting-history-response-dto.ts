export interface MeetingHistoryResponseDto {
    success: boolean;
    statusCode: number;
    data: MeetingHistoryResponseDtoData[];
    message: string;
    timestamp: Date;
}

export interface MeetingHistoryResponseDtoData {
    id: number;
    date: Date;
    time: string;
    duration: number;
    otherParticipantName: string;
    myRole: string;
    reason: string;
    status: string;
}
