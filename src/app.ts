import express, { Request, Response, Application } from "express";
import ip from "ip"
import cors from "cors"
import { Code } from "./enum/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enum/status.enum";
import apiRouter from "./routes";
import { APP_MESSAGE } from "./enum/app.message.enum";

export class App {
    private readonly app: Application;
    constructor(
        private readonly port: (string | number) = process.env.SERVER_PORT || 3000
    ) {
        this.app = express();
        this.middleware();
        this.routes();
    }
    listen() {
        this.app.listen(this.port);
        console.log(`${APP_MESSAGE.APP_RUNNING} http://${ip.address()}:${this.port}`);
    }

    private middleware(): void {
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/api', apiRouter);
        this.app.get('/', (_: Request, res: Response) => res.status(200).send(new HttpResponse(Code.OK, Status.OK, APP_MESSAGE.WELCOME)));
        this.app.all('*', (_: Request, res: Response) => res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, APP_MESSAGE.BAD_ROUTE)));
    }
}

