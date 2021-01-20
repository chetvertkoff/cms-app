import cors from 'cors'
import bodyParser from 'body-parser'
import apiFactory from './apiFactory';

export default async function api (app: ExpressApp): Promise<void> {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
  app.use('/api/', apiFactory())
}
