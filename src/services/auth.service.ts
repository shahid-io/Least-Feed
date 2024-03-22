import bcrypt from 'bcrypt';
import { connection } from '../config/db.config';
import { AUTH_QUERY } from '../query/auth.query';
import { generateToken } from "../utils/helper";
import { Signin } from '../interface/auth.interface';
export class AuthService {

    private pool: any;
    constructor(pool: any) {
        this.pool = pool;
    }

    static async createInstance(): Promise<AuthService> {
        const pool = await connection();
        return new AuthService(pool);
    }


    async signin(user: Signin): Promise<any> {
        try {
            if (!this.pool) {
                console.log('Database connection not initialized');
                throw new Error('Database connection not initialized');
            }
            const result: any = await this.pool.query(AUTH_QUERY.SELECT_USER_BY_EMAIL, user.email);
            if (!result || result.length === 0) {
                throw new Error('User not found');
            }
            const fetchedUser = result[0];
            const passwordIsValid = await bcrypt.compare(user.password, fetchedUser[0].password);
            if (!passwordIsValid) {
                throw new Error('Invalid password');
            }
            const token = await generateToken(result[0])
            return {
                message: "Login successful",
                token: token,
                user: {
                    id: fetchedUser[0].id,
                    email: fetchedUser[0].email,
                }
            };
        } catch (error: unknown) {
            console.error('Error signing in:', error);
            throw error;
        }
    }

    async isAuthenticated(token: string): Promise<any> {
        try {
            if (!token) {
                throw new Error("Token is missing");
            }
            
            return {}
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    }
}