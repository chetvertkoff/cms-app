import { ObjectId } from "bson";
import DBConnect, { DBCollections } from "../../../helper/DBConnect";

export interface IUserModel extends IUserLoginData{ // Модель пользователя
  profile: {
    [key: string]: IUserProfile
  }
}

interface IUserProfile {
  name: string
  avatar: string
  roleId: number
}

export interface IUserLoginData{
  _id?: ObjectId|string
  login: string
  password: string
}

export default class UserModel {
  private readonly dataBase:DBConnect = new DBConnect()
  private readonly collection: DBCollections = 'users'

  public async getUserLoginData ({login}: IUserLoginData): Promise<IUserLoginData> {
    const db = this.dataBase.connection    
    try {      
      return await db
       .collection(this.collection)
       .findOne({login}, {projection: { _id: 1, login: 1, password: 1 }})    
    }catch(err) {
      throw new Error(err)
    }
  }

  public async getUserByField(field) {
    return field
  }
}
