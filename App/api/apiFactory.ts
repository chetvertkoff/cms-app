import { Router } from 'express';
import User from '../controller/user';

class Factory {
  private readonly route: Router = Router()
  private controllers = [
    User
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