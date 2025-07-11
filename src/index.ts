import AutoRegisterController from "loader/auto-resgister";
import DefaultResponseException from "exception/default-response-exception";
import DefaultErrorException from "exception/default-error-exception";
import { Get, Post, Delete, Put, Middleware, Prefix} from "./decorators/ExpressMethod";
import {IResponseInterceptor, IErrorInterceptor} from "./types/interceptor";
import {IConfigRouter} from "./types/loader";

function AutoRegisterControllers(config: IConfigRouter): Promise<void> {
	return new AutoRegisterController(
		config.router,
		config.controllerPath,
		config.logging,
		{
			responseInterceptor: config.responseInterceptor || new DefaultResponseException(),
			errorInterceptor: config.errorInterceptor || new DefaultErrorException()
		}
	).register()
}

export {AutoRegisterControllers, Get, Post, Delete, Put, Middleware, Prefix, IResponseInterceptor, IErrorInterceptor};

