import "reflect-metadata"
import {Router} from "express";
import {AutoRegisterInt} from "../interfaces";
import MainLoad from "./MainLoadAbstract";

// Automatically load and use controllers with decorated methods
export default class AutoRegisterController extends MainLoad implements AutoRegisterInt {
	
	constructor(router: Router, controllerPath: string[], logger: boolean = false) {
		super(router, controllerPath, logger);
	}
	
	getAllRegisterRoutes(): string[] {
		return this.routes;
	}
	
	
}


