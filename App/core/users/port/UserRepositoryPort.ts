import User from "../entities/User";
import {OptionsRepositoriy} from "../../common/entities/OptionsRepositoriy";

export interface UserRepositoryPort {
    findUser(by: {login?: string, id?: string}, options?: OptionsRepositoriy):Promise<User>
}