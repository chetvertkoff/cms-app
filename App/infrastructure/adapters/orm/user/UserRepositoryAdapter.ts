import {injectable} from "inversify";
import {UserRepositoryPort} from "../../../../core/user/port/UserRepositoryPort";
import {User} from "../../../../core/user/entity/User";
import {Option} from "../../../../core/common/types";

@injectable()
export class UserRepositoryAdapter implements UserRepositoryPort{
    async findUser(by: {login?: string, id?: string}): Promise<Option<User>>{

        return
    }
}

