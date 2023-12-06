import {AutoRegisterController} from "./routes/router";
import {Router} from "express";

export default function AutoRegisterControllers(config: {router: Router, controllerPath: string, logging: boolean}) {
	return new AutoRegisterController(config.router, config.controllerPath, config.logging)
}