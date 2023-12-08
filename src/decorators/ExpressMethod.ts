import "reflect-metadata"
import {middlewareFunction} from "../interfaces";

function createMethodDecorator(method: string) {
	return function (path: string) {
		return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
			/*const originalMethod = descriptor.value;
			router[method.toLowerCase()](path, (req: express.Request, res: express.Response) => {
				originalMethod.call(target, req, res);
			});*/
			/*console.log("target", target.constructor);
			console.log("path", path);
			console.log("method", method);*/
			Reflect.defineMetadata('path', path, target, propertyKey);
			Reflect.defineMetadata('method', method, target, propertyKey);
			//Reflect.defineMetadata('router', router, target.constructor);
		};
	};
}

function Prefix(prefix: string) {
	return function (target: any) {
		/*const originalMethod = descriptor.value;
		router[method.toLowerCase()](path, (req: express.Request, res: express.Response) => {
			originalMethod.call(target, req, res);
		});*/
		/*console.log("target", target.constructor);
		console.log("path", path);
		console.log("method", method);*/
		Reflect.defineMetadata('prefix', prefix, target);
		//Reflect.defineMetadata('router', router, target.constructor);
	};
}

function Middleware(middleware: middlewareFunction) {
	return function (target: any, propertyKey: string) {
		Reflect.defineMetadata('middleware', middleware, target.constructor, propertyKey);
	};
}

const Get = createMethodDecorator('GET');
const Post = createMethodDecorator('POST');
const Delete = createMethodDecorator('DELETE');
const Put = createMethodDecorator('PUT');

export {Get, Post, Delete, Put, Prefix, Middleware}

// Add other HTTP method decorators as needed (PUT, DELETE, etc.)
