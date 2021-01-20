import { userLoginData } from "../../api/user";
import DBConnect, { DBCollections } from "../DBConnect";

export interface IUser extends IUserProfile {
  _id: string
  id: number
  login: string
  password :string
}

interface IUserProfile {
  name: string
  role: string
  avatar: string
  roleId: number
}

export default class UserModel  {
  private readonly dataBase:DBConnect = new DBConnect()
  private readonly collection: DBCollections = 'users'

  public async getUserLoginData ({login}: userLoginData): Promise<userLoginData> {  
    const db = await this.dataBase.connectDB();
    try {      
      return await db
       .collection(this.collection)
       .findOne({login}, {projection: { _id: 1, login: 1, password: 1 }})    
    }catch(err) {
      throw new Error(err)
    } 
    finally  {
      this.dataBase.closeDB()
    }
  }
}
