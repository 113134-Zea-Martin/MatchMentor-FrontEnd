export interface ForgotPasswordResponse {
    success:    boolean;
    statusCode: number;
    data:       string;
    message:    string;
    timestamp:  Date;
}
export interface ForgotPasswordRequest {
    email: string;
}