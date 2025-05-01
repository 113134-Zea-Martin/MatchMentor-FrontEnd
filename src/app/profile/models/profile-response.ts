export interface ProfileResponse<T> {
    success: boolean;
    statusCode: number;
    data: T;
    message: string;
    timestamp: string | null;
}
// interfaces/tutor-profile.interface.ts
export interface TutorProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    location: string;
    currentProfession: string;
    company: string;
    yearsOfExperience: number;
    professionalBio: string;
    hourlyRate: number;
    interests: string[];
    linkedinUrl: string;
    bio: string;
    createdAt: string;
    isActive: boolean;
    isVisible: boolean;
  }
  
  // interfaces/student-profile.interface.ts
  export interface StudentProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    location: string;
    educationLevel: string;
    studyArea: string;
    institution: string;
    graduationYear: string;
    mentoringGoals: string;
    interests: string[];
    linkedinUrl: string;
    bio: string;
    createdAt: string;
    isActive: boolean;
  }