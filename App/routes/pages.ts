import express from 'express'
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const pages = express.Router()
const dbName = 'CRUD'
var db

//DB Connect
MongoClient(process.env.URL,{ useUnifiedTopology: true })
 .connect((err, client)=>{
     db = client.db(dbName)
 })

pages.get('/:id',(req,res)=>{
    var arr = []
    const parId= +req.params.id
    db
     .collection('pages')
     .find({parent:parId})
    //  .limit()
     .toArray((err, data)=>{   
         res.send(data)
     })
})


export default pages