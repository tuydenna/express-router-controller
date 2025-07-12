import {IErrorInterceptor} from "@interfaces/interceptor";
import {Response, Request} from "express";

export default class DefaultErrorException implements IErrorInterceptor {
    errorException(err: any, req: Request, res: Response) {
        if (err.hasOwnProperty("method")) {
            // @ts-ignore
            return req.status(404).json({message: "Route Not Found"});
        }
        res.locals.message = err.message;
        // render the error page
        res.status(err.status || 500);
        res.json({message: err.message || "internal server error"});
    }
}