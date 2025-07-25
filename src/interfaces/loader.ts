import {Router} from "express";
import {IInterceptors} from "@interfaces/interceptor";

export interface IConfigRouter extends Partial<IInterceptors> {
    router: Router

    /**
     *
     *  Controller path where you define routing logic and retrieve from express server
     *
     *  Ex1: `[path.join(__dirname, "controllers/*.js")]`
     *
     *  Ex2: `[path.join(__dirname, "controllers/user-controller.js"), path.join(__dirname, "controllers/post-controller.js")]`
     *
     *  **Note** Use * before `.extension` to include all files in folder
     */
    controllerPath: any[]

    /**
     *  Default = `False`
     *
     *  ALl routes logs will show in your running terminal.
     *
     *  **Note** This logging will not affect your own `console.log` behaviour.
     */
    logging?: boolean

    /**
     *  Default = `False`
     *
     *  classTransform = `True` transform plain JavaScript objects into class instances and vice versa,
     *  enabling the use of decorators for serialization and deserialization.
     *  and metadata when working with data from APIs or databases.
     *
     *  **Note** classTransform = `True` only works in controller class that registered.
     */
    classTransform?: boolean
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