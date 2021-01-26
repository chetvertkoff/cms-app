import { Router, Request, Response } from 'express'
import UserModel from '../model/user';
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';

export type userLoginData = {
  _id?: string
  login: string
  password: string
}

export default class User{
  private readonly route: Router = Router()
  private appRouter: Router

  constructor(appRouter: Router) {
    this.appRouter = appRouter
  }

  private async login (req: Request, res: Response): Promise<Response> {
    try {
      const {login, password}: userLoginData = req.body
      if(!login || !password) res.status(400).send('Incorrect request')

      const user: userLoginData = await new UserModel().getUserLoginData(req.body)  
      const matchPass = await bcrypt.compare(password, user.password)
      if(!matchPass) return res.status(401).send('Incorrect password')
      
      const token:string = jwt.sign(
        { userId: user._id },
        'mern',
        { expiresIn: '1h' }
      )

      return res.send({'token': token}) 
    } catch (error) {      
      res.status(500).send(error)
    }
  }

  public init(): void {
    this.appRouter.use('/user/', this.route)
    this.route.post('/login', this.login)
  }
}

