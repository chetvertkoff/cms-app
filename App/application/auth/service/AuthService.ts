import 'reflect-metadata'
import {inject, injectable} from "inversify"
import { UserLogin } from "../model/UserLogin"
import { UserJwtToken } from "../model/UserJwtToken"
import {User} from "../../../core/user/entity/User"
import {TYPES} from "../../di/Types"
import {JwtService} from "./JwtService";
import {BcryptService} from "./BcryptService";
import {BadRequest} from "../../exception/BadRequest";
import {NotFoundError} from "../../exception/NotFoundError";
import {UnauthorizedError} from "../../exception/UnauthorizedError";
import {UserRepositoryPort} from "../../../core/user/port/UserRepositoryPort";

@injectable()
export class AuthService {
    constructor(
        @inject(TYPES.UserRepositoryDI)
        private readonly _userRepository: UserRepositoryPort,

        @inject(TYPES.JwtServiceDI)
        private readonly _jwtService: JwtService,

        @inject(TYPES.BcryptServiceDI)
        private readonly _bcryptService: BcryptService
    ){}

    public async validateUser(userInput: UserLogin): Promise<User> {
        const {login, password} = userInput
        if(!login || !password) throw new BadRequest()
        const user: User  = await this._userRepository.findUser({login: userInput.login})

        if(!user.id) throw new NotFoundError('User not founded')

        const matchPassword = await this._bcryptService.compare(password, user.password)
        if(!matchPassword) throw new UnauthorizedError('Incorrect password')

        return user
    }
    
    public async login (userInput: UserLogin): Promise<UserJwtToken> {
        const token: string = this._jwtService.sign (
            { userId: userInput.login },
            'mern',
            { expiresIn: '1h' }
        )
        return new UserJwtToken(token);
    }
}