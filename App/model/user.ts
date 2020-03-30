import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import { getMaxID } from './pages'

type User={
  _id?: string,
  id?: number,
  login:string,
  password: string,
  name?:string,
  role?: string,
  avatar?: string
}

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
  .toArray((err, data:User)=>{
    callback(data[0])
  })
}

export const writeNewUser=(user:User, callback):void=>{
  getMaxID('users', (data:number)=>{  
    db
    .collection('users')
    .insertOne({
      id: data[0].id+1,
      login: user.login,
      password: user.password,
      profile:{
        name: user.name,
        role: user.role,
        avatar: user.avatar
      }
    })
    .then(result=>callback(result))
  })
}

export const findUsers = (callback):void=>{
  db
  .collection('users')
  .find()
  .project({_id: 0, login: 0, password: 0})
  .toArray((err, data)=>{     
     callback(data, err)
  })
}

export const removeUser = (id:number, callback):void=>{
  db
  .collection('users')
  .deleteOne(
      {id: id}
  )
  .then(result=>callback(result))
}
