import fs from 'fs';
import path from 'path';
import "reflect-metadata"
import {Router} from "express";

// Automatically load and use controllers with decorated methods
export class AutoRegisterController {
	
	private routesWithMiddleware = [];
	private routesWithoutMiddleware = [];
	
	constructor(private router: Router, private controllerPath: string, private logger: boolean = false) {
		this.register();
	}
	
	register() {
		try {
			const controllersPath: string = this.controllerPath;
			if (controllersPath) {
				fs.readdirSync(controllersPath).forEach((file: string) => {
					if (file.endsWith('.js') || file.endsWith('.ts')) {
						const controller = require(path.join(controllersPath, file));
						const controllerInstance = new controller[Object.keys(controller)[0]]();
						const methods: string[] = Object.getOwnPropertyNames(controllerInstance.constructor.prototype);
						methods.forEach((methodName: string) => {
							//const router = Reflect.getMetadata('router', controllerInstance.constructor);
							const prefix        = Reflect.getMetadata('prefix', controllerInstance.constructor);
							const middleware    = Reflect.getMetadata('middleware', controllerInstance.constructor, methodName);
							const method        = Reflect.getMetadata('method', controllerInstance, methodName);
							let path            = Reflect.getMetadata('path', controllerInstance, methodName);
							if (path && method) {
								path = prefix ? prefix.trim() + path : path;
								if (middleware) {
									this.routesWithMiddleware.push({path, method: method.toLowerCase(), middleware, function: controllerInstance[methodName]});
								} else {
									this.routesWithoutMiddleware.push({path, method: method.toLowerCase(), function: controllerInstance[methodName]});
								}
							}
						});
					}
				});
				
				this.routesWithoutMiddleware.forEach(obj1 => {
					this.router[obj1.method](obj1.path, obj1.function);
				});
				
				this.routesWithMiddleware.forEach(obj2 => {
					this.router.use(obj2.path, obj2.middleware);
					this.router[obj2.method](obj2.path, obj2.function);
				});
				
				if (this.logger) {
					this.router.stack.forEach((layer, index: number) => {
						if (layer.route) {
							console.log(layer.route.path, this.router.stack[index+1] ? this.router.stack[index+1].route ? "" : this.router.stack[index+1].name : "");
						}
					});
				}
			}
		} catch (e) {
			console.warn("Controller autoload register failed!");
			throw e;
		}
	}
}


