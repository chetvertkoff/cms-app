import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import settings from '../settings'

dotenv.config()
const dbName = 'CRUD'
var db

//DB Connect
MongoClient(settings.URL,{ useUnifiedTopology: true })
 .connect((err, client)=>{
     db = client.db(dbName)
 })

 export const getMenu = (callback)=>{
    db
    .collection('menu')
    .find({})
    .toArray((err, data)=>{  
        callback(data, err) 
    })
 }