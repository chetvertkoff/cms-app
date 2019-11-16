import express from 'express'
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const menu = express.Router()
const dbName = 'CRUD'
var db

//DB Connect
MongoClient(process.env.URL,{ useUnifiedTopology: true })
 .connect((err, client)=>{
     db = client.db(dbName)
 })

menu.get('/',(req,res)=>{
    db
     .collection('menu')
     .find()
    //  .limit()
     .toArray((err, data)=>{   
         res.json(data)
     })
})


export default menu
