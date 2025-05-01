export interface EditProfileRequest {
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
    currentProfession: string;
    company:           string;
    yearsOfExperience: number;
    professionalBio:   string;
    hourlyRate:        number;
    isVisible:         boolean;
    interests:         string[];
    role:              string;
    linkedinUrl:       string;
    bio:               string;
    isActive:          boolean;
}
