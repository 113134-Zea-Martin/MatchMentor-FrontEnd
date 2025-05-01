export interface InterestResponse {
    success:    boolean;
    statusCode: number;
    data:       Datum[];
    message:    string;
    timestamp:  Date;
}

export interface Datum {
    name: string;
}
