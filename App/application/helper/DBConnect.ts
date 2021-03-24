import {MongoClient, Db} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

declare global {
  type MDBClient = MongoClient
  type MongoDB = Db
}

export type DBCollections = 'users'|'pages'

export default class DBConnect {
  private readonly dbName = 'CRUD'
  private readonly URL = process.env.URL
  private static instance: DBConnect
  private static exists: boolean
  private _client: MDBClient
  private _connection: MongoDB

  constructor() {
    if (DBConnect.exists) {
      return DBConnect.instance
    }
    DBConnect.instance = this
    DBConnect.exists = true
    this._client = new MongoClient(this.URL, { useUnifiedTopology: true })
  }

  public get connection (): MongoDB {return this._connection}

  public async initConnect(): Promise<void> {
    try {
      await this.connectDB()
    } catch(e) {    
      await this.closeDB()
    }
  }

  public async connectDB (): Promise<void> {    
    await this._client.connect()        
    this._connection = this._client.db(this.dbName)
  }

  public async closeDB (): Promise<void> {    
    await this._client.close()
  }
}

