export interface PendingRequestResponse {
    id:               number;
    studentId:        number;
    firstName:        string;
    lastName:         string;
    studyArea:        string;
    educationLevel:   string;
    mentoringGoals:   string;
    studentInterests: string[];
}
