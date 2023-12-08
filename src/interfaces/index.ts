import {Router} from "express";

interface ConfigInt {
	router: Router,
	controllerPath: string[],
	logging: boolean
}

interface AutoRegisterInt {
	getAllRegisterRoutes(): string[]
}

type middlewareFunction = Function;

export {middlewareFunction, ConfigInt, AutoRegisterInt}