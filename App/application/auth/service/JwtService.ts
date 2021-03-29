import {Secret, sign, SignOptions} from "jsonwebtoken";

export class JwtService {
    public sign(
        payload: string | Buffer | Record<string, unknown>,
        secretOrPrivateKey: Secret,
        options?: SignOptions,
    ): string {
        return sign(payload, secretOrPrivateKey, options)
    }
}