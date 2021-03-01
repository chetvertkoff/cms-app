import { Router } from 'express';
import User from '../modules/users/users.service';

class Factory {
  private api = [
    User
  ]

  public init(): Router {
    const route = Router()
    this.api.forEach(Api => {
      new Api(route).init()
    })
    return route;
  }

}

const apiFactory = (): Router => {  
  return new Factory().init();
}

export default apiFactory