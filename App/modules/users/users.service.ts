import { Router, Request, Response } from 'express'
import AbstractService from '../AbstractService';
import Users, {IUsers} from './Users';
abstract class AbstractUsersService extends AbstractService {
  protected abstract login (req: Request, res: Response): Promise<Response>
}

export default class UsersService extends AbstractUsersService{
  private readonly route: Router = Router()
  private appRouter: Router
  private users: IUsers

  constructor(appRouter: Router) {
    super();
    this.appRouter = appRouter
    this.users = new Users()
  }

  protected async login (req: Request, res: Response): Promise<Response> {
    try {      
      const token = await this.users.getJwtToken(req.body)      
      console.log(token);
      
      return res.send({'token': token})
    } catch (error) {     
      res.status(error.code ?? 400).send(error.message ?? 'Incorrect request')
    }
  }

  public init(): void {
    this.appRouter.use('/user/', this.route)
    this.route.post('/login', this.login.bind(this))
  }
}

