import {IErrorInterceptor} from "@interfaces/interceptor";
import e from "express";

export default class DefaultErrorException implements IErrorInterceptor {
    errorException(err: any, req: e.Request, res: e.Response) {
        res.locals.message = err.message;
        // render the error page
        res.status(err.status || 500);
        res.send({message: err.message});
    }
}