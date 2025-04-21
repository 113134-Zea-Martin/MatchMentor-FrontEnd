export interface UserResponseDTO {
    success:    boolean;
    statusCode: number;
    data:       Data;
    message:    string;
    timestamp:  Date;
}

export interface Data {
    id:                number;
    firstName:         string;
    lastName:          string;
    email:             string;
    birthDate:         Date;
    location:          string;
    educationLevel:    string;
    studyArea:         string;
    institution:       string;
    graduationYear:    string;
    mentoringGoals:    string;
    currentProfession: null;
    company:           null;
    yearsOfExperience: number;
    professionalBio:   null;
    hourlyRate:        number;
    interests:         string[];
    role:              string;
    linkedinUrl:       string;
    bio:               string;
    createdAt:         Date;
    isActive:          boolean;
}
