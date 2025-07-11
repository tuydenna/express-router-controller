import {IResponseInterceptor} from "@interfaces/interceptor";
import {Response, Request} from "express";

export default class DefaultResponseException implements IResponseInterceptor {
    response(data: any, req: Request, res: Response) {
        res.status(200).json(data);
    }
}