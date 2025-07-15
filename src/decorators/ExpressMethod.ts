import "reflect-metadata"
import {ArgMetaKey, ControllerMetaKey} from "@constant/metadakey";

function createMethodDecorator(method: string) {
	return function (path: string) {
		return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
			Reflect.defineMetadata(ControllerMetaKey.path, path, target, propertyKey);
			Reflect.defineMetadata(ControllerMetaKey.method, method, target, propertyKey);
		};
	};
}

function createArgumentDecorator(type: string) {
	return function (key?: string) {
		return function (target: Object, methodName: string | symbol, paramIndex: number) {
			Reflect.defineMetadata(ArgMetaKey[type] + paramIndex, {type, index: paramIndex, key}, target.constructor, methodName);
		};
	}
}

function Prefix(prefix: string) {
	return function (target: any) {
		Reflect.defineMetadata(ControllerMetaKey.prefix, prefix, target);
	};
}

function Middleware(middleware: Function) {
	return function (target: any, propertyKey: string) {
		Reflect.defineMetadata(ControllerMetaKey.middleware, middleware, target.constructor, propertyKey);
	};
}

const Get = createMethodDecorator('GET');
const Post = createMethodDecorator('POST');
const Delete = createMethodDecorator('DELETE');
const Put = createMethodDecorator('PUT');

const Param = createArgumentDecorator('params');
const Query = createArgumentDecorator('query');
const Body = createArgumentDecorator('body');
const Req = createArgumentDecorator('res');
const Res = createArgumentDecorator('req');

export {Get, Post, Delete, Put, Prefix, Middleware, Param, Query, Body, Res, Req}

// Add other HTTP method decorators as needed (PUT, DELETE, etc.)
