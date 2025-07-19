import {Router} from "express";
import {IInterceptors} from "@interfaces/interceptor";

export interface IConfigRouter extends Partial<IInterceptors> {
    router: Router,
    controllerPath: any[],
    logging: boolean,
}

export interface IArgMetadata  {
    type: "params" | "query" | "body" | "res" | "req",
    key: string
    classTran?: {
        classType: any,
        properties: any[]
    }
}

export interface IAutoRegister {
    getAllRegisterRoutes(): string[]
}