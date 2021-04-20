import {Middleware, ExpressErrorMiddlewareInterface, BadRequestError} from 'routing-controllers';
import {injectable} from "inversify";
import express from "express";
import {ApiResponse} from "../../core/common/entities/ApiResponse";

@injectable()
@Middleware({type: 'after'})
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
     error(error: any, request: express.Request, response: express.Response, next: express.NextFunction): void {
        const errResponse: ApiResponse<unknown> = ApiResponse.error(error.code, error.message)
         response.status(errResponse.code).send(errResponse.message)
         next();
    }
}