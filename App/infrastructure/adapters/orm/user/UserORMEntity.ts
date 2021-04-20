import {Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";

@Entity()
export class UserORMEntity {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    login: string

    @Column()
    password: string

    @Column(type => UserProfile)
    profile: UserProfile

}



export class UserProfile {

    @Column()
    name: string

    @Column()
    role: string

    @Column()
    avatar: string

    @Column()
    roleId: number

}