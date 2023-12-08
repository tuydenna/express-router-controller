import AutoRegisterController from "./config/AutoRegisterController";
import {AutoRegisterInt, ConfigInt} from "./interfaces";
import { Get, Post, Delete, Put, Middleware, Prefix} from "./decorators/ExpressMethod";

function AutoRegisterControllers(config: ConfigInt): AutoRegisterInt {
	return new AutoRegisterController(config.router, config.controllerPath, config.logging);
}

export {AutoRegisterControllers, Middleware, Prefix, Get, Post, Delete, Put};


