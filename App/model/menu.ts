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

 export const getMenu = (callback)=>{
    db
    .collection('menu')
    .find({})
    .toArray((err, data)=>{  
        callback(data) 
    })
 }