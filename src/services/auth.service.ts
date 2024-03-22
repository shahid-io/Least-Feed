import { connection } from '../config/db.config';
import { AUTH_QUERY } from '../query/auth.query';

export class AuthService {
    private pool: any
    constructor() {
        this.pool = null;
    }
    async initialize() {
        try {
            this.pool = await connection();
        } catch (error: unknown) {
            console.error('Error initializing database connection:', error);
            throw error;
        }
    }


    async signin(user: any): Promise<any> {
        try {
            if (!this.pool) {
                console.log('Database connection not initialized');
                throw new Error('Database connection not initialized');
            }
            const result: any = await this.pool.query(AUTH_QUERY.SELECT_USER_BY_EMAIL, user.email);
            if (result && result.length > 0) {
                const fetchedUser = result[0];
                console.log(fetchedUser);
            } else {
                throw new Error('User not found');
            }
        } catch (error: unknown) {
            console.error('Error signing in:', error);
            throw error;
        }
    }

}