// Automatically load and use controllers with decorated methods
import {Router} from "express";
import MainLoad from "loader/main-loader";
import {IAutoRegister} from "types/loader";
import {IInterceptors} from "types/interceptor";

export default class AutoRegisterController extends MainLoad implements IAutoRegister {

    constructor(router: Router, controllerPath: string[], logger: boolean = false, interceptors: IInterceptors) {
        super(router, controllerPath, logger, interceptors);
    }

    getAllRegisterRoutes(): string[] {
        return this.routes;
    }
}
