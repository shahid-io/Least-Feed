import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthService } from "../services/auth.service";


export interface CustomRequest extends Request {
    token: string | JwtPayload;
    user?: string | JwtPayload;
}

export const checkAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['x-access-token'] as string;
        verifyToken(token)
            .then(decoded => {
                req.token = decoded;
                req.user = decoded;
                console.log(decoded);
                next();
            })
            .catch(error => {
                console.error("Token verification error:", error);
                res.status(401).send("Unauthorized: Token verification failed.");
            });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


const verifyToken = (token: string): Promise<JwtPayload | string> => {
    return new Promise((resolve, reject) => {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            reject(new Error("JWT secret is not defined in the environment variables."));
        }
        jwt.verify(token, JWT_SECRET!, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded as JwtPayload | string);
            }
        });
    });
};