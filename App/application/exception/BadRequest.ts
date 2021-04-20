import {IHttpError} from "./IError";

export class BadRequest extends Error implements IHttpError{
    code = 400
    constructor(message = 'Bad Request') {
        super(message)
        Object.setPrototypeOf(this, BadRequest.prototype)
    }
}