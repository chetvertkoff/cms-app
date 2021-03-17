export default class UserLoginInput {
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
}