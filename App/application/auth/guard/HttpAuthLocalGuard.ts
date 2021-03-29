import { ExpressMiddlewareInterface } from 'routing-controllers';
import express from "express";
import * as passport from 'passport';

export class HttpAuthLocalGuard implements ExpressMiddlewareInterface {

    constructor(private readonly _authService) {}

    private local (request: express.Request, response: express.Response, next: express.NextFunction): void {
        this._authService.validateUser(request.body)
        return next()
    }

    use(request: express.Request, response: express.Response, next: express.NextFunction): Promise<passport.Authenticator> {
        return passport.authenticate('local', { session: false }, this.local)(request, response, next)
    }
}