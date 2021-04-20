import "reflect-metadata"
import {inject, injectable} from "inversify";
import {TYPES} from "../../di/Types";
import {AuthService} from "../service/AuthService";

@injectable()
export class LocalStrategy {
    constructor(@inject(TYPES.AuthServiceDI) private readonly _authService: AuthService) {}

     async validate(data): Promise<void> {

            await this._authService.validateUser(data).then()
    }
}