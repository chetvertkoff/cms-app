import { Body, Controller, Post, UseBefore  } from "routing-controllers"
import AuthService from "../auth/service/AuthService"
import UserLogin from '../auth/type/UserLoginIn'
import UserJwtToken from "../auth/type/UserJwtTokenOut"
import {HttpAuthLocalGuard} from "../auth/guard/HttpAuthLocalGuard"

@Controller('/auth')
export default class AuthController {
    constructor(
        private readonly _authService: AuthService
    ){}

    @Post('/login')
    @UseBefore(HttpAuthLocalGuard)
    public async login (@Body() body: UserLogin): Promise<UserJwtToken> {
        const JwtToken = await this._authService.login(body)            
        return UserJwtToken.model(JwtToken)
    }
}