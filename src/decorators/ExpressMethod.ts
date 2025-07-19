import "reflect-metadata"
import {ArgMetaKey, ClassMetaKey, ControllerMetaKey} from "@constant/metadakey";

function Transform(callBack: Function) {
	return function (target: any, propertyKey: string) {
		const existingKeys = Reflect.getMetadata(ClassMetaKey.property, target) || [];
		console.log(existingKeys, target);
		Reflect.defineMetadata(ClassMetaKey.property, [...existingKeys, {key: propertyKey, callBack}], target);
	};
}

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
const Req = createArgumentDecorator('req');
const Res = createArgumentDecorator('res');

export {Get, Post, Delete, Put, Prefix, Middleware, Param, Query, Body, Res, Req, Transform}

// Add other HTTP method decorators as needed (PUT, DELETE, etc.)
