import { Router } from 'express';
import UsersAPI from '../modules/users/users.api';

class Factory {
  private readonly route: Router = Router()
  private controllers = [
    UsersAPI
  ]

  public init(): Router {
    this.controllers.forEach(Controller => {
      new Controller(this.route).init()
    })
    return this.route;
  }
}

const apiFactory = (): Router => {  
  return new Factory().init();
}

export default apiFactory