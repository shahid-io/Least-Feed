import { Request, Response } from 'express';
import { connection } from '../config/db.config';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { HttpResponse } from '../domain/response';
import { FEED_QUERY } from '../query/feed.query';
import { ResultSetHeader } from 'mysql2';
import { Feed } from '../interface/feed.interface';
import { FEED_MESSAGE } from '../enum/feed.message.enum';


export const getFeeds = async (req: Request, res: Response) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: any = await pool.query(FEED_QUERY.SELECT_FEEDS);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, FEED_MESSAGE.FETCHED_SUCCESS, result[0]));
    } catch (error: unknown) {
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}


export const getFeed = async (req: Request, res: Response) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: any = await pool.query(FEED_QUERY.SELECT_FEED, [req.params.patientId]);
        if (((result[0]) as Array<any>).length > 0) {
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, FEED_MESSAGE.FETCHED_SUCCESS, result[0]));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, FEED_MESSAGE.NOT_FOUND));
        }
    } catch (error: unknown) {
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}

export const createFeed = async (req: Request, res: Response): Promise<Response<Feed>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let feed: Feed = { ...req.body };
    try {
        const pool = await connection();
        const result: any = await pool.query(FEED_QUERY.CREATE_FEED, Object.values(feed));
        feed = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, FEED_MESSAGE.CREATED_SUCCESS, feed));
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};

export const updateFeed = async (req: Request, res: Response): Promise<Response<Feed>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let feed: Feed = { ...req.body };
    try {
        const pool = await connection();
        const result: any = await pool.query(FEED_QUERY.SELECT_FEED, [req.params.feedId]);
        if (((result[0]) as Array<any>).length > 0) {
            const result: any = await pool.query(FEED_QUERY.UPDATE_FEED, [...Object.values(feed), req.params.feedId]);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, FEED_MESSAGE.UPDATED_SUCCESS, { ...feed, id: req.params.feedId }));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, FEED_MESSAGE.NOT_FOUND));
        }
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};

export const deleteFeed = async (req: Request, res: Response): Promise<Response<Feed>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: any = await pool.query(FEED_QUERY.SELECT_FEED, [req.params.feedId]);
        if (((result[0]) as Array<any>).length > 0) {
            const result: any = await pool.query(FEED_QUERY.DELETE_FEED, [req.params.patientId]);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, FEED_MESSAGE.DELETED_SUCCESS));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, FEED_MESSAGE.NOT_FOUND));
        }
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
};