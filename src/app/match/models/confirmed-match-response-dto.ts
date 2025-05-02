export interface ConfirmedMatchResponseDto {
    id:          number;
    userId:      number;
    fullName:    string;
    role:        string;
    description: string;
    updatedAt:   Date;
    isActive:    boolean;
}
