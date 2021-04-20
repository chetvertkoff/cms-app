import {compare} from "bcryptjs";
import {injectable} from "inversify";

@injectable()
export class BcryptService {
    async compare(data: any, encrypted: string): Promise<boolean> {
        return compare(data, encrypted)
    }
}