import {Request, Response} from "express";

interface IResponseInterceptor {
    response: (data: any, req: Request, res: Response) => void;
}

interface IErrorInterceptor {
    errorException: (error: any, req: Request, res: Response) => void;
}

interface IInterceptors {
    responseInterceptor: IResponseInterceptor;
    errorInterceptor: IErrorInterceptor;
}

export {IErrorInterceptor, IResponseInterceptor, IInterceptors};