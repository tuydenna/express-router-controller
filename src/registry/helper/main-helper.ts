import {IArgMetadata} from "@interfaces/loader";
import {NextFunction, Request, Response} from "express";
import ClassTransform from "@registry/class-transform";

function checkValidClassModule(classTemplate: unknown): boolean {
    return typeof classTemplate === 'function' && /^class\s/.test(Function.prototype.toString.call(classTemplate))
}

function cleanURLPath(path: string | undefined): string {
    if (path && path.trim()) {
        const newPath: string = path.trim();
        return newPath.startsWith("/") ? newPath : "/" + newPath;
    }
    return "";
}

function routeNextResolver(callBack: Function, args: IArgMetadata[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const mappedArgs = args.map(({type, key, classTran}) => {
                const source = type === "res" ? res : type === "req" ? req : req[type];
                const data =  key ? source[key] : source;
                // Class Transform Logic
                if (classTran) {
                    return ClassTransform.toClassInstance(data, classTran);
                }
                return data;
            })
            Promise.resolve(callBack(...mappedArgs)).catch(error => {
                next(error instanceof Error ? error : new Error(error));
            }).then(data=> {
                if (res.headersSent == false) next(data)
            });
        } catch (e) {
            return next(new Error(e));
        }
    }
}

export {checkValidClassModule, cleanURLPath, routeNextResolver}