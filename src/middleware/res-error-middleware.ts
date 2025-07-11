import {Response, Request, NextFunction} from "express";
import { IResponseInterceptor } from "types/interceptor";

export default function ResErrorMiddleware(responseInterceptor: IResponseInterceptor) {
    return function (data, req: Request, res: Response, next: NextFunction) {
        if (data instanceof Error) {
            return next(data);
        }
        return responseInterceptor.response(data, req, res);
    }
}