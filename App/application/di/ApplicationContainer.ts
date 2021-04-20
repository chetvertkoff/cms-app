import 'reflect-metadata';
import { Container } from 'inversify';
import {TYPES} from './Types'
import {AuthController} from "../controllers/AuthController";
import {AuthService} from "../auth/service/AuthService";
import {UserRepositoryAdapter} from "../../infrastructure/adapters/orm/user/UserRepositoryAdapter";
import {JwtService} from "../auth/service/JwtService";
import {BcryptService} from "../auth/service/BcryptService";
import {LocalStrategy} from "../auth/auth-strategy/LocalStrategy";
import {HttpAuthLocalGuard} from "../auth/guard/HttpAuthLocalGuard";
import {CustomErrorHandler} from "../interceptor/HttpErrorHandler";

const container = new Container();
container.bind(AuthController).toSelf()
container.bind(TYPES.AuthServiceDI).to(AuthService)
container.bind(TYPES.UserRepositoryDI).to(UserRepositoryAdapter)
container.bind(TYPES.JwtServiceDI).to(JwtService)
container.bind(TYPES.BcryptServiceDI).to(BcryptService)
container.bind(TYPES.LocalStrategyDI).to(LocalStrategy)
container.bind(HttpAuthLocalGuard).toSelf()
container.bind(CustomErrorHandler).toSelf()

export { container };