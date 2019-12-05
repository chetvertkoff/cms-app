import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config()
const dbName = 'CRUD'
var db

//DB Connect
MongoClient(process.env.URL,{ useUnifiedTopology: true })
 .connect((err, client)=>{
     db = client.db(dbName)
 })


export const getPagesByParentId = (id:number, callback)=>{
    db
     .collection('pages')
     .find({parent:id})
     .toArray((err, data)=>{   
        callback(err,data)
     })
}

export const getPageById = (id:number, callback)=>{
    db
     .collection('pages')
     .find({id:id})
     .limit(1)
     .toArray((err, data)=>{   
        callback(err,data)
     })
}

export const getMaxID=(callback)=>(
    db
     .collection('pages')
     .find()
     .sort({'id':-1})
     .project({id:1, _id: 0})
     .limit(1)
     .toArray((err,data)=>{         
        callback(data)
     })
)

export const insertPage=(page)=>{
    if(page){
        db
         .collection('pages')
         .insertOne(page)
    }
}