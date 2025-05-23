export interface UserResponseDTO {
    success:    boolean;
    statusCode: number;
    data:       UserResponseDTOData;
    message:    string;
    timestamp:  Date;
}

export interface UserResponseDTOData {
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
    isVisible:         boolean;
}
