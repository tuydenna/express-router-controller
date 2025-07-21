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
    classTran?: IClassTransform
}

export interface IClassTransform {
    classModule: any
    transProps: IClassTransformProps[]
}

export interface IClassTransformProps {
    key: string;
    callBack: (val: unknown) => unknown;
}

export interface IAutoRegister {
    getAllRegisterRoutes(): string[]
}