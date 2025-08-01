// Automatically load and use controllers with decorated methods
import {Router} from "express";
import MainLoad from "@registry/main-loader";
import {IAutoRegister} from "@interfaces/loader";
import {IInterceptors} from "@interfaces/interceptor";

export default class AutoRegisterController extends MainLoad implements IAutoRegister {

    constructor(router: Router, controllerPath: string[], logger: boolean = false, interceptors: IInterceptors, classTransform: boolean = false) {
        super(router, controllerPath, logger, interceptors, classTransform);
    }

    getAllRegisterRoutes(): string[] {
        return this.routes;
    }
}
