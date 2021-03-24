import {ObjectId} from "bson";
import Entity from "../../Entity";

export type userID = string|number|ObjectId

export default class User extends Entity {
  constructor(
    private readonly _login: string,
    private readonly _password: string,
    private readonly _name: string,
    private readonly _avatar: string,
    private readonly _roleId: number,
    private readonly _id: userID
  ){super()}

  get login(): string {
    return this._login;
  }

  get password(): string {
    return this._password;
  }

  get name(): string {
    return this._name;
  }

  get avatar(): string {
    return this._avatar;
  }

  get roleId(): number {
    return this._roleId;
  }

  get id(): userID {
    return this._id;
  }

  public static getModel(
      login: string,
      password: string,
      name: string,
      avatar: string,
      roleId: number,
      id: userID
    ): User {
    return new User(login, password, name, avatar, roleId, id)
  }

}