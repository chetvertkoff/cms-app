import 'reflect-metadata'
import {inject, injectable} from 'inversify';
import {Body, Controller, JsonController, Post, UseBefore} from "routing-controllers"
import {AuthService} from "../auth/service/AuthService"
import {UserLogin} from '../auth/model/UserLogin'
import {UserJwtToken} from "../auth/model/UserJwtToken"
import {HttpAuthLocalGuard} from "../auth/guard/HttpAuthLocalGuard"
import {TYPES} from "../di/Types";
import {ApiResponse} from "../../core/common/entities/ApiResponse";

@JsonController('/auth')
@injectable()
export class AuthController {
    constructor(
        @inject(TYPES.AuthServiceDI)
        private readonly _authService: AuthService
    ){}

    @Post('/login')
    @UseBefore(HttpAuthLocalGuard)
    public async login (@Body() body: UserLogin): Promise<ApiResponse<UserJwtToken>> {
        return ApiResponse.success(await this._authService.login(body))
    }
}