import {Response, Request, NextFunction} from "express";
import {IInterceptors} from "@interfaces/interceptor";

export default function ResErrorMiddleware(interceptors: IInterceptors) {
    return function (data, req: Request, res: Response, next: NextFunction) {
        if (data instanceof Error) {
            console.error("\x1b[31m[Global Error]:", "\x1b[0m", data);
            return interceptors.errorInterceptor.errorException(data, req, res)
        } else {
            return interceptors.responseInterceptor.response(data, req, res);
        }

    }
}