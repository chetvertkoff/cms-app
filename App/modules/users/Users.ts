import UserModel, {userLoginData} from "./users.model"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUsers {
  getJwtToken(body): Promise<string>
}
export default class Users implements IUsers {
  public async getJwtToken(body: any): Promise<string> {
    const {login, password}: userLoginData = body
    if(!login || !password) throw {code: 400, message: 'Incorrect request'}

    const user: userLoginData = await new UserModel().getUserLoginData(body)  
    if(!user._id) throw {code: 404, message: 'User not founded'}
    
    const matchPass = await bcrypt.compare(password, user.password)
    if(!matchPass) throw {code: 401, message: 'Incorrect password'}
    
    return jwt.sign(
      { userId: user._id },
      'mern',
      { expiresIn: '1h' }
    )
  }
}