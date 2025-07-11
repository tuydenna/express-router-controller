import {NextFunction, Request, Response, Router} from "express";
import fs from "fs";
import path from "path";
import ResErrorMiddleware from "../middleware/res-error-middleware";
import {IInterceptors} from "../types/interceptor";

export default abstract class MainLoad {

    private routesWithMiddleware = [];
    private routesWithoutMiddleware = [];
    protected routes: string[] = [];

    protected constructor(
        private router: Router,
        private controllerPath: string[],
        private logger: boolean = false,
        private interceptors: IInterceptors
    ) {
    }

     async register() {
        await this.registerControllers();
        this.registerExpressRoutes();
    }

    private async registerControllers() {
        try {
            for (const conPath of this.controllerPath) {
                if ((typeof conPath) === "function") {
                    // @ts-ignore
                    const classInstance = new conPath();
                     this.resolveControllerDecorator(classInstance);
                } else {
                    const arr: string[] = conPath.includes("\\") ? conPath.split("\\") : conPath.split("/");

                    if (!arr.length) return;

                    const files: string = arr[arr.length - 1];
                    let fileArr: string[] = files.split(".");

                    if (!fileArr.length) return;

                    const fileName: string = fileArr[0];
                    const ext: string = fileArr[fileArr.length - 1];

                    if (fileName == "*") {
                        const foldersPath: string = conPath.replace("*." + ext, "");
                        for (const file of fs.readdirSync(foldersPath)) {
                            if (file.endsWith('.' + ext)) {
                                const controller: string = await import(path.join(foldersPath, file));
                                const controllerInstance = new controller[Object.keys(controller)[0]]();
                                await this.resolveControllerDecorator(controllerInstance);
                            }
                        }
                    } else {
                        const controller: string = await import(conPath);
                        const controllerInstance = new controller[Object.keys(controller)[0]]();
                        await this.resolveControllerDecorator(controllerInstance);
                    }
                }
            }
        } catch (e) {
            console.log("\x1b[36m","[Routing Controller]:","\x1b[31m","loading controller failed!", e);
        }
    }

    private resolveControllerDecorator(classInstance: ClassDecorator) {
        try {
            const methods: string[] = Object.getOwnPropertyNames(classInstance.constructor.prototype);
            for (const methodName of methods) {
                //const router = Reflect.getMetadata('router', controllerInstance.constructor);
                const prefix: string = Reflect.getMetadata('prefix', classInstance.constructor);
                const middleware: string = Reflect.getMetadata('middleware', classInstance.constructor, methodName);
                const method: string = Reflect.getMetadata('method', classInstance, methodName);
                let path: string = Reflect.getMetadata('path', classInstance, methodName);
                if (path && method) {
                    path = prefix ? prefix.trim() + path : path;
                    if (middleware) {
                        this.routesWithMiddleware.push({path, method: method.toLowerCase(), middleware, function: classInstance[methodName].bind(classInstance)});
                    } else {
                        this.routesWithoutMiddleware.push({path, method: method.toLowerCase(), function: classInstance[methodName].bind(classInstance)});
                    }
                }
            }
        } catch (e) {
            console.log("\x1b[36m","[Routing Controller]:","\x1b[31m","register routes failed!", e);
        }
    }

    private registerExpressRoutes() {
        for (const route of this.routesWithoutMiddleware ) {
            this.router[route.method](route.path, this.routeNextResolver(route.function));
        }

        for (const route of this.routesWithMiddleware ) {
            this.router.use(route.path, this.routeNextResolver(route.middleware));
            this.router[route.method](route.path, this.routeNextResolver(route.function));
        }

        // Res and error handler
        this.router.use(ResErrorMiddleware(this.interceptors.responseInterceptor));
        //Error Interceptor
        this.router.use(this.interceptors.errorInterceptor.errorException);

        if (this.logger) {
            const stacks = this.router.stack;
            for (const stack of stacks) {
                if (stack.route) {
                    this.routes.push(stack.route.path);
                    console.log("\x1b[36m","["+Object.keys(stack.route.methods)[0].toUpperCase()+"]","\x1b[32m", stack.route.path);
                }
            }
        }
    }

    private routeNextResolver(callBack: Function) {
        return function (req: Request, res: Response, next: NextFunction) {
            Promise.resolve(callBack(req, res, next)).catch(next).then(next);
        }
    }
}