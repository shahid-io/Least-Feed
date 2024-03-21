import { Request, Response } from 'express';
import { connection } from '../config/db.config';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { HttpResponse } from '../domain/response';
import { AUTH_QUERY } from '../query/auth.query';
import { ResultSetHeader } from 'mysql2';
import { Feed } from '../interface/feed.interface';
import { Auth } from '../interface/auth.interface';
import { AUTH_MESSAGE } from '../enum/auth.message.enum';

export const getUsers = async (req: Request, res: Response) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: any = await pool.query(AUTH_QUERY.SELECT_USERS);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, AUTH_MESSAGE.FETCHED_SUCCESS, result[0]));
    } catch (error: unknown) {
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}


export const getUser = async (req: Request, res: Response) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: any = await pool.query(AUTH_QUERY.SELECT_USER, [req.params.userId]);
        if (((result[0]) as Array<any>).length > 0) {
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, AUTH_MESSAGE.FETCHED_SUCCESS, result[0]));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, AUTH_MESSAGE.NOT_FOUND));
        }
    } catch (error: unknown) {
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}

export const createUser = async (req: Request, res: Response): Promise<Response<Feed>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let user: Auth = { ...req.body };
    try {
        const pool = await connection();
        const result: any = await pool.query(AUTH_QUERY.CREATE_USER, Object.values(user));
        user = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, AUTH_MESSAGE.CREATED_SUCCESS, user));
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response<Feed>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let user: Auth = { ...req.body };
    try {
        const pool = await connection();
        const result: any = await pool.query(AUTH_QUERY.SELECT_USER, [req.params.userId]);
        if (((result[0]) as Array<any>).length > 0) {
            const result: any = await pool.query(AUTH_QUERY.UPDATE_USER, [...Object.values(user), req.params.feedId]);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, AUTH_MESSAGE.UPDATED_SUCCESS, { ...user, id: req.params.feedId }));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, AUTH_MESSAGE.NOT_FOUND));
        }
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response<Feed>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: any = await pool.query(AUTH_QUERY.SELECT_USER, [req.params.userId]);
        if (((result[0]) as Array<any>).length > 0) {
            const result: any = await pool.query(AUTH_QUERY.DELETE_USER, [req.params.userId]);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, AUTH_MESSAGE.DELETED_SUCCESS));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, AUTH_MESSAGE.NOT_FOUND));
        }
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};