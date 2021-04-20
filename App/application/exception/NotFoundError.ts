import {IHttpError} from "./IError";

export class NotFoundError extends Error implements IHttpError{
    code = 404
    constructor(message = 'Not Found') {
        super(message)
    }
}