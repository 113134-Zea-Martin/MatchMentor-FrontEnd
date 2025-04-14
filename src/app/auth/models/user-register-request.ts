export interface UserRegisterRequest {
    firstName: string;
    lastName:  string;
    email:     string;
    password:  string;
    interests?: string;
}

export interface UserRegisterResponse {
    success:   boolean;
    data:      Data;
    message:   string;
    timestamp: Date;
}

export interface Data {
    firstName: string;
    lastName:  string;
    email:     string;
    interests: string;
}
