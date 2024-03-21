import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";

export class HttpResponse {
    private timeStamp: string;
    constructor(
        private readonly statusCode: Code,
        private readonly httpStatus: Status,
        private readonly message: String,
        private data?: {}
    ) {
        this.timeStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
        this.message = message;
        this.data = data;

    }
}