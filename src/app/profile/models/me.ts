export interface Me {
    success:    boolean;
    statusCode: number;
    data:       Data;
    message:    string;
    timestamp:  Date;
}

export interface Data {
    firstName: string;
    lastName:  string;
    role:      string;
    id:        number;
    email:     string;
    sub:       string;
    iat:       number;
    exp:       number;
    active:    boolean;
}
