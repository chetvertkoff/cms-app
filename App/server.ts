import express, {Application} from 'express'
import dotenv from 'dotenv'
import DBConnect from './helper/DBConnect';
import api from './api/index';

declare global {
  type ExpressApp = Application
}

dotenv.config()

const port: string = process.env.PORT;

const initApp = async (): Promise<void> => {  
  const app: Application = express()
  const db = new DBConnect()

  await db.initConnect()
  await api(app)
  app.listen(port, () => console.log(`Server running on ${port}`))
}

initApp();