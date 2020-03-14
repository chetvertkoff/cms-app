import bcrypt  from 'bcryptjs'
import jwt  from 'jsonwebtoken'
import { getUser } from './../model/user'

export const login = (req, res)=>{
  try {
    const login:string = req.body.login
    const pass:string = req.body.password

    if(!login || !pass) return res.status(400).send('Incorrect query')
    
    getUser(login,async user=>{
      if(!user) return res.status(400).send('Cannot find user')
      
      const matchPass = await bcrypt.compare(pass, user.password)
      if(!matchPass) return res.status(400).send('Incorrect password')

      const token:string = jwt.sign(
        { userId: user._id },
        'mern',
        { expiresIn: '1h' }
      )

      res.send({'token': token}) 
    })

  } catch (error) {
    res.status(400).send('Incorrect query')
  }
}

type User={
  login:string,
  password: string
}