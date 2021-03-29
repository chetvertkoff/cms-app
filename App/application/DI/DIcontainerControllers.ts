import {ContainerModule, interfaces} from "inversify";
import AuthController from "../controllers/AuthController";

export default new ContainerModule((bind: interfaces.Bind) => {
    bind(AuthController).toSelf()
})