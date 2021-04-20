import {Secret, sign, SignOptions} from "jsonwebtoken";
import {injectable} from "inversify";

@injectable()
export class JwtService {
    public sign(
        payload: string | Buffer | Record<string, unknown>,
        secretOrPrivateKey: Secret,
        options?: SignOptions,
    ): string {
        return sign(payload, secretOrPrivateKey, options)
    }
}