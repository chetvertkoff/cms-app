import { Body, Controller, Post } from "routing-controllers"
import AuthService from "../auth/AuthService"
import UserLogin from '../auth/ports/in/UserLoginIn'
import UserJwtToken from "../auth/ports/out/UserJwtTokenOut"

@Controller('/auth')
export default class AuthController {
    constructor(
        private readonly _authService: AuthService
    ){}

    @Post('/login')
    public async login (@Body() body: UserLogin): Promise<UserJwtToken> {
        const JwtToken = await this._authService.login(body)            
        return UserJwtToken.model(JwtToken)
    }
}