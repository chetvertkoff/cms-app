
import express, {Application} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { createExpressServer } from 'routing-controllers';
import AuthController from './controllers/AuthController';

declare global {
    type ExpressApp = Application
}

dotenv.config()
const controllers = [AuthController]

export default class Server {
    private static port = process.env.PORT
    public static async runServer(): Promise<void> {
        const app: ExpressApp = createExpressServer({
            controllers, 
            classTransformer: false,
            routePrefix: '/api'
        })
        // app.use(cors())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
        app.listen(Server.port, () => console.log(`Server running on ${Server.port}`))
    }
}
