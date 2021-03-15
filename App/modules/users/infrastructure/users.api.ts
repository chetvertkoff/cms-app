import { Router, Request, Response } from 'express'
import AbstractAPI from '../../AbstractAPI';
import Users, {IUsers} from '../Users';
import UsersMiddleware from './users.middleware';

abstract class AbstractUsersAPI extends AbstractAPI {
  protected abstract login (req: Request, res: Response): Promise<Response>
  protected abstract registration (req: Request, res: Response): Promise<Response>
}

export default class UsersAPI extends AbstractUsersAPI{
  private readonly route: Router = Router()
  private appRouter: Router
  private users: IUsers
  private mdlwr: UsersMiddleware

  constructor(appRouter: Router) {
    super();
    this.appRouter = appRouter
    this.users = new Users()
    this.mdlwr = new UsersMiddleware()
  }

  protected async login (req: Request, res: Response): Promise<Response> {
    try {      
      const token = await this.users.getJwtToken(req.body)            
      return res.send({'token': token})
    } catch (error) {     
      res.status(error.code ?? 500).send(error.message ?? error)
    }
  }
  
  protected async registration (req: Request, res: Response): Promise<Response> {
    try {
      return res.send({'token': 'a'})
    } catch (error) {
      res.status(error.code ?? 500).send(error.message ?? error)
    }
  }
  
  public init(): void {
    this.appRouter.use('/user/', this.route)
    
    this.route.post('/login', this.login.bind(this))
    this.route.post('/registration', this.mdlwr.checkLogin.bind(this), this.registration.bind(this))
  }
}

