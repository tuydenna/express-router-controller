import AutoRegisterController from "@registry/auto-resgister";
import DefaultResponseException from "@config/exception/default-response-exception";
import DefaultErrorException from "@config/exception/default-error-exception";
import {IConfigRouter} from "@interfaces/loader";

function AutoRegisterControllers(config: IConfigRouter): Promise<void> {
	return new AutoRegisterController(
		config.router,
		config.controllerPath,
		config.logging,
		{
			responseInterceptor: config.responseInterceptor || new DefaultResponseException(),
			errorInterceptor: config.errorInterceptor || new DefaultErrorException()
		},
		config.classTransform
	).register()
}

export * from "@decorators/express-method";
export * from "@decorators/class-tranfrom";
export * from "@interfaces/interceptor"
export {AutoRegisterControllers, IConfigRouter};

