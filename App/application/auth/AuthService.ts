import { UserLoginInPort } from "./type/UserLoginIn"
import { UserJwtTokenOutPort } from "./type/UserJwtTokenOut"
import User from "../../core/users/entities/User";

export default class AuthService {
    constructor(
        private readonly _userRepository,
        private readonly _jwtService,
        private readonly _bcryptService
    ){}
    
    public async login (userInput: UserLoginInPort): Promise<UserJwtTokenOutPort> {
        const {login, password} = userInput
        if(!login || !password) throw {code: 400, message: 'Incorrect request'}

        const user: User  = await this._userRepository.findUser({login: userInput.login})

        if(!user.id) throw {code: 404, message: 'User not founded'}

        const matchPassword = await this._bcryptService.compare(password, user.password)
        if(!matchPassword) throw {code: 401, message: 'Incorrect password'}

        return this._jwtService.sign (
            { userId: user.id },
            'mern',
            { expiresIn: '1h' }
        )
    }

}