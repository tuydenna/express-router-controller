import {Router} from "express";
import {IInterceptors} from "types/interceptor";

export interface IConfigRouter extends Partial<IInterceptors> {
    router: Router,
    controllerPath: any[],
    logging: boolean,
}

export interface IAutoRegister {
    getAllRegisterRoutes(): string[]
}