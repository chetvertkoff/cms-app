import { Request, Response, NextFunction } from 'express'
import UserModel, { IUserLoginData, IUserModel } from './users.model'

export interface IUsersMiddleware {
  checkLogin(req: Request, res: Response, next: NextFunction): Promise<void>
}

export default class UsersMiddleware implements IUsersMiddleware{
  public async checkLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {login}: IUserLoginData = req.body
      if(!login) throw {code: 400, message: 'Incorrect request'}
      
      // const user: IUserModel = new UserModel().getUserByField({login})

      next()
    } catch (error) {
      res.status(error.code ?? 500).send(error.message ?? error)
    }
  }
}