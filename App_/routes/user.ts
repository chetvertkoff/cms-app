import express from 'express'
import auth from './../middleware/auth';

import { login, addNewUser, deleteUser, getUsers, getUserByLogin } from './../controller/user';

const user = express.Router()

user.get('/' ,auth,(req,res)=>{
  res.send({'auth':'ok'})
})

user.get('/getUsers', getUsers)
user.get('/getUser', getUserByLogin)
user.post('/',login)
user.post('/newUser', addNewUser)
user.delete('/deleteUser/:id', deleteUser)

export default user