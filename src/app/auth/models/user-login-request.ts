export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    success:   boolean;
    data:      Data;
    message:   string;
    timestamp: Date;
}

export interface Data {
    id:        number;
    firstName: string;
    lastName:  string;
    email:     string;
    role:      string;
    token:     string;
    active:    boolean;
}
