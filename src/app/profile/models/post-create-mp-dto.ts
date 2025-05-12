export interface PostCreateMpDto {
    userId: number;
}

export interface PostMercadoPagoAuth {
    code: string;
    userId: number;
}

export interface PostMercadoPagoAuthResponse {
    scope:         string;
    access_token:  string;
    token_type:    string;
    expires_in:    number;
    user_id:       number;
    refresh_token: string;
    public_key:    string;
    live_mode:     boolean;
}