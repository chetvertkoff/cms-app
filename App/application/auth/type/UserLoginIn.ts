export interface UserLoginInPort {
    login: string
    password: string
}

export default class UserLogin implements UserLoginInPort{
  constructor(
    private readonly _login: string,
    private readonly _password: string
  ){}

  get login():string {
    return this._login
  }

  get password():string {
    return this._password
  }

  public static model (login, password) {
    return new UserLogin(login, password)
  }
}