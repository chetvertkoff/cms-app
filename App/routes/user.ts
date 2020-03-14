import express from 'express'
import auth from './../middleware/auth';


import { login } from './../controller/user';

const user = express.Router()

user.get('/' ,auth,(req,res)=>{
  res.send({'auth':'ok'})
})

user.post('/',login)

export default user