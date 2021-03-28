import { ExpressMiddlewareInterface } from 'routing-controllers';

export class HttpAuthLocalGuard implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): any {
        next()
    }
}