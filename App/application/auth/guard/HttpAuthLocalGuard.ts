import "reflect-metadata"
import {inject, injectable} from "inversify";
import {Body, ExpressMiddlewareInterface, Middleware, Req} from 'routing-controllers';
import express from "express";
import {TYPES} from "../../di/Types";
import {LocalStrategy} from "../auth-strategy/LocalStrategy";

@injectable()
export class HttpAuthLocalGuard implements ExpressMiddlewareInterface {
    constructor(@inject(TYPES.LocalStrategyDI) private readonly _localStrategy: LocalStrategy) {}

    use(@Req() request: express.Request, response: express.Response, next: express.NextFunction): void {
        request.on('data', async data => {
            try {
                await this._localStrategy.validate(JSON.parse(data))
            }catch (e) {
                next(e)
            }
        })
    }
}