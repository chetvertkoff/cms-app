export interface UserJwtTokenOutPort{
    JwtToken: string
}

export default class UserJwtToken implements UserJwtTokenOutPort {
    constructor(private readonly _JwtToken){}

    get JwtToken() {
        return this._JwtToken
    }

    public static model(JwtToken) {
        return new UserJwtToken(JwtToken)
    }
}