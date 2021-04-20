import {injectable, decorate} from "inversify";
import {UserRepositoryPort} from "../../../../core/user/port/UserRepositoryPort";
import {User} from "../../../../core/user/entity/User";
import {Option} from "../../../../core/common/types";
import {EntityRepository} from "typeorm";
import {UserORMEntity} from "./UserORMEntity";
import {BaseRepository} from "../BaseRepository";

@injectable()
@EntityRepository(UserORMEntity)
export class UserRepositoryAdapter extends BaseRepository<UserORMEntity> implements UserRepositoryPort{
    constructor() {
        super();
    }
    async findUser(by: {login?: string, id?: string}): Promise<Option<User>>{
        const {login} = by
        const user = await this.findOne({login})
        return  user
    }
}

