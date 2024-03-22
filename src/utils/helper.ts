import jwt from "jsonwebtoken";
import { Request } from 'express';


export const generateToken = async (user: any) => {
    const secretKey = process.env.JWT_SECRET || 'Hello';
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
        expiresIn: '1d',
    });
    return token;
}

export const Loggs = (req: Request) => {
    return console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
}


