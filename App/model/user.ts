import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const dbName = 'CRUD'
var db

//DB Connect
MongoClient(process.env.URL,{ useUnifiedTopology: true })
 .connect((err, client)=>{
     db = client.db(dbName)
 })


export const getUser=(login:string,callback):void=>{
  db
  .collection('users')
  .find({login:login})
  .limit(1)
  .toArray((err, data:User)=>callback(data[0]))
}

type User={
  _id:number,
  login:string,
  password: string
}