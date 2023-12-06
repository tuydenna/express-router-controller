import {AutoRegisterController} from "./routes/router";
import {Router} from "express";

interface ConfigInt {
	router: Router,
	controllerPath: string,
	logging: boolean
}

export default function AutoRegisterControllers(config: ConfigInt): AutoRegisterController {
	return new AutoRegisterController(config.router, config.controllerPath, config.logging)
}

