export type userID = string|number
export type emptyId = null|undefined

export default class UserLoginDataEntity {
  constructor(
    private readonly login: string,
    private readonly password: string,
    private readonly id?: userID|emptyId
  ){}

  public static getModel(
      login: string,
      password: string,
      id?: userID|emptyId,
    ): UserLoginDataEntity {
    return new UserLoginDataEntity(login, password, id)
  }
}