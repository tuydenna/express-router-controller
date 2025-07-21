import {IArgMetadata, IClassTransformProps} from "@interfaces/loader";
import {NextFunction, Request, Response} from "express";

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
                if (classTran) {
                    const rawObj: Object = plainToInstance(classTran.classModule, data);
                    const transedObj: Object = instanceToTransform(rawObj, classTran.transProps);
                    return transedObj;
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

function instanceToTransform(obj: Object, properties: IClassTransformProps[]): Object {
    for ( const property of properties) {
        obj[property.key] = property.callBack(obj[property.key]);
    }
    return obj;
}

function plainToInstance<T>(cls: new () => T, plainObj: object): T {
    const instance = new cls();
    for (const key in plainObj) {
        if (Object.prototype.hasOwnProperty.call(plainObj, key)) {
            (instance as any)[key] = (plainObj as any)[key];
        }
    }
    return instance;
}

export {checkValidClassModule, cleanURLPath, routeNextResolver}