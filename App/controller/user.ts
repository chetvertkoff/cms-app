import bcrypt  from 'bcryptjs'
import jwt  from 'jsonwebtoken'
import { getUser, writeNewUser, findUsers, removeUser } from './../model/user'
import e from 'express'

type User={
  _id?: string,
  id?: number,
  login:string,
  password: string,
  name?:string,
  role?: string,
  avatar?: string
}

export const login = (req, res)=>{
  try {
    const login:string = req.body.login
    const pass:string = req.body.password
    if(!login || !pass) return res.status(400).send('Incorrect query')
    console.log(req.body);
    
    getUser(login,async (user:User)=>{
      if(!user) return res.status(400).send('Cannot find user')
      
      const matchPass = await bcrypt.compare(pass, user.password)
      console.log(matchPass);
      
      if(!matchPass) return res.status(400).send('Incorrect password')

      const token:string = jwt.sign(
        { userId: user._id },
        'mern',
        { expiresIn: '1h' }
      )
      delete user.login
      delete user.password

      res.send({'token': token, 'user': user}) 
    })

  } catch (error) {
    res.status(400).send('Incorrect query')
  }
}

export const getUsers = (req,res)=>{
  try {
    findUsers((data)=>{
      console.log(data);
      
      res.send(data)
    }) 
  } catch (error) {
    res.status(400).send('Incorrect query')
  }
}

export const getUserByLogin = (req,res)=>{
  try {
    const login:string = req.query.login
    
    if(!login) return res.status(400).send('Incorrect query') 
    
    getUser(login, (user)=>{
      if(!user) return res.status(404).send('Cant find user')
      delete user.password
      delete user.login
      res.send(user)
    })
  } catch (error) {
    res.status(400).send('Incorrect query')  
  }
}

export const addNewUser = (req,res)=>{
  try {
    const {password, login, name, role}:User = req.body
    if(!login || login ==''
      || !name || name == ''
      || !password || password == '') return res.status(400).send('Values ​​are missing')
    
    getUser(login,user=>{
      if(user) return res.status(409).send('User already exists')
      writeNewUser({...req.body,password: bcrypt.hashSync(password)}, result=>{
        if(result.ops[0].id){
          res.send({status: 'ok'})  
        }else{
          res.status(400).send('Incorrect query')
        }
      })   
    })
       
  } catch (error) {
    res.status(400).send('Incorrect query')
  }
}

export const deleteUser=(req, res)=>{
  try {

    const id:number = +req.params.id
    if(id){
      res.send({id: id})
      removeUser(id, result=>{
        res.send({id: id})
      })
    }else{
      res.status(400).send('Incorrect query')
    }
  } catch (error) {
    res.status(400).send('Incorrect query')
  }
}

