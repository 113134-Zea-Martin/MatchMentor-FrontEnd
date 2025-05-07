export interface CreateMeetingRequestDto {
    studentId: number;
    mentorId:  number;
    matchId:   number;
    date:      string;
    time:      string;
    duration:  number;
    reason:    string;
}

export interface CreateMeetingRsponsetDto {
    success: boolean;
    message: string;
}