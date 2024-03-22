export interface Auth {
    id?: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    status: string;
    created_at?: string;
}

export interface Signin {
    email: string;
    password: string;
} 
