import {MongoClient, Db} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

declare global {
  type MDBClient = MongoClient
  type MongoDB = Db
}

export type DBCollections = 'users'|'pages'|'menu'

export default class DBConnect {

  private readonly dbName = 'CRUD'
  private readonly URL = process.env.URL
  private static instance: DBConnect
  private static exists: boolean
  private _client: MongoClient

  constructor() {
    if (DBConnect.exists) {
      return DBConnect.instance
    }
    DBConnect.instance = this
    DBConnect.exists = true
    this._client = new MongoClient(this.URL, {useUnifiedTopology:true})
  }

  public async initConnect(): Promise<void> {
    try {
      this.connectDB()
    } finally {    
      await this._client.close()
    }
  }

  public async connectDB (): Promise<MongoDB> {
    await this._client.connect()
    const client = this._client.db(this.dbName)
    return client
  }

  public closeDB (): void {
    this._client.close()
  }

}

