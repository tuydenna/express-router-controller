import {Router} from "express";
import fs from "fs";
import path from "path";
import ResErrorMiddleware from "@middleware/res-error-middleware";
import {IInterceptors} from "@interfaces/interceptor";
import {IArgMetadata, IClassTransformProps} from "@interfaces/loader";
import {ArgMetaKey, ClassMetaKey, ControllerMetaKey} from "@constant/metadakey";
import {checkValidClassModule, cleanURLPath, routeNextResolver} from "@registry/helper/main-helper";

export default abstract class MainLoad {

    private routesWithMiddleware = [];
    private routesWithoutMiddleware = [];
    protected routes: string[] = [];

    protected constructor(
        private router: Router,
        private controllerPath: string[],
        private logger: boolean,
        private interceptors: IInterceptors,
        private classTransform: boolean
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
                            if (!file.endsWith('.' + ext)) continue;

                            const controller: string = await import(path.join(foldersPath, file));

                            // if(!(Array.isArray(Object.keys(controller)) && Object.keys(controller).length)) continue;

                            const classTemplate: any = controller[Object.keys(controller)[0]];

                            if (!checkValidClassModule(classTemplate))  continue;
                            const controllerInstance = new classTemplate();
                            this.resolveControllerDecorator(controllerInstance);
                        }
                    } else {
                        const controller: string = await import(conPath);

                        // if(!(Array.isArray(Object.keys(controller)) && Object.keys(controller).length)) continue;

                        const classTemplate: any = controller[Object.keys(controller)[0]];

                        if (!checkValidClassModule(classTemplate))  continue;

                        const controllerInstance = new classTemplate();
                        this.resolveControllerDecorator(controllerInstance);
                    }
                }
            }
        } catch (e) {
            console.log("\x1b[36m","[express-routing-controller-khmer]:","\x1b[31m","loading controller failed!", e);
        }
    }

    private registerExpressRoutes() {
        try {
            for (const route of this.routesWithoutMiddleware ) {
                this.router[route.method](route.path, routeNextResolver(route.function, route.args));
            }

            for (const route of this.routesWithMiddleware ) {
                this.router[route.method](route.path, route.middleware, routeNextResolver(route.function, route.args));
            }

            // Res and error handler
            this.router.use(ResErrorMiddleware(this.interceptors));

            if (this.logger == false) return;

            const stacks = this.router.stack;

            for (const stack of stacks) {

                if (!stack.route) continue;

                const innerStack: any[] = stack.route?.stack || []
                this.routes.push(stack.route.path);

                console.log("\x1b[36m","["+Object.keys(stack.route.methods)[0].toUpperCase()+"]","\x1b[32m", stack.route.path, "\x1b[36m", "[MIDDLEWARE]:", "\x1b[32m", innerStack.length > 1 ? innerStack[0].name : "N/A");
            }
        } catch (e) {
            console.log("\x1b[36m","[express-routing-controller-khmer]:","\x1b[31m","routes register failed!", e);
        }
    }

    private resolveControllerDecorator(classInstance: ClassDecorator) {
        try {
            const methods: string[] = Object.getOwnPropertyNames(classInstance.constructor.prototype);
            for (const methodName of methods) {
                //const router = Reflect.getMetadata('router', controllerInstance.constructor);
                const prefix: string = Reflect.getMetadata(ControllerMetaKey.prefix, classInstance.constructor);
                const middleware: string = Reflect.getMetadata(ControllerMetaKey.middleware, classInstance.constructor, methodName);
                const method: string = Reflect.getMetadata(ControllerMetaKey.method, classInstance, methodName);
                let path: string = Reflect.getMetadata(ControllerMetaKey.path, classInstance, methodName);

                const args: IArgMetadata[] = [];
                const functionArgLength : number = classInstance[methodName].length;
                const argsMetadataKey: string[] = ['params', 'query', 'body', 'res', 'req'] as const;

                for (let i: number = 0; i < functionArgLength; i++) {
                    for (const argMetadataKey of argsMetadataKey) {
                        // Resolve Params Decorators
                        const arg: IArgMetadata | undefined = Reflect.getMetadata(ArgMetaKey[argMetadataKey] + i, classInstance.constructor, methodName);
                        if (arg) {
                            // Resolve Class Props transform
                            if (this.classTransform) {
                                const paramTypes: any[] | undefined = Reflect.getMetadata("design:paramtypes", classInstance, methodName);
                                if (paramTypes && checkValidClassModule(paramTypes[i]) && ['params', 'query', 'body', 'res', 'req'].includes(argMetadataKey)) {
                                    const transProps: IClassTransformProps[] = Reflect.getMetadata(ClassMetaKey.property, paramTypes[i].prototype);
                                    arg.classTran = {
                                        classModule: paramTypes[i],
                                        transProps
                                    }
                                }
                            }
                            args.push(arg);
                            break;
                        }
                    }
                }

                path = cleanURLPath(prefix) + cleanURLPath(path);

                if (!(path && method)) continue;

                if (middleware) {
                    this.routesWithMiddleware.push({path, method: method.toLowerCase(), middleware, function: classInstance[methodName].bind(classInstance), args});
                } else {
                    this.routesWithoutMiddleware.push({path, method: method.toLowerCase(), function: classInstance[methodName].bind(classInstance), args});
                }
            }
        } catch (e) {
            console.log("\x1b[36m","[express-routing-controller-khmer]:","\x1b[31m","decorator resolver failed!", e, "try in tsconfig.json set emitDecoratorMetadata = true");
        }
    }

}