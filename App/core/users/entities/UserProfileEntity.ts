import { userID } from "./UserLoginDataEntity"

export type profileID = userID|null|undefined

export default class UserProfileEntity {
  constructor(
    private readonly name: string,
    private readonly avatar: string,
    private readonly roleId: number,
    private readonly id?: profileID
  ){}

  public static getModel(
    name:string,
    avatar:string,
    roleId:number,
    id:profileID
  ): UserProfileEntity {
    return new UserProfileEntity(name, avatar, roleId, id)
  }
}