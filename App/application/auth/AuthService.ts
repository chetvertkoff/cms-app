import { UserLoginInPort } from "./ports/in/UserLoginIn"
import { UserJwtTokenOutPort } from "./ports/out/UserJwtTokenOut"

export default class AuthService {
    constructor(){}
    
    public async login (userInput: UserLoginInPort): Promise<UserJwtTokenOutPort> {
        const {login, password} = userInput
        if(!login || !password) throw {code: 400, message: 'Incorrect request'}

        const user:  = await new UserModel().getUserLoginData(body)  

        if(!user._id) throw {code: 404, message: 'User not founded'}

        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword) throw {code: 401, message: 'Incorrect password'}

        return jwt.sign (
            { userId: user._id },
            'mern',
            { expiresIn: '1h' }
        )
    }

}