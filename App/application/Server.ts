
import {Application} from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { createExpressServer, useContainer } from 'routing-controllers';
import {AuthController} from './controllers/AuthController';
import {container} from "./di/ApplicationContainer";
import {CustomErrorHandler} from "./interceptor/HttpErrorHandler";

declare global {
    type ExpressApp = Application
}

dotenv.config()
const controllers = [AuthController]

export default class Server {

    private static port = process.env.PORT

    public static async runServer(): Promise<void> {
        useContainer(container)
        const app: ExpressApp = createExpressServer({
            controllers, 
            classTransformer: false,
            routePrefix: '/api',
            defaultErrorHandler: false,
            validation: true,
            middlewares: [CustomErrorHandler]
        })

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({'extended': true}))
        app.listen(Server.port, () => console.log(`Server running on ${Server.port}`))
    }

}
