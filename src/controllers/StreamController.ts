import {AuthMiddleware, Get, Prefix} from "../config/ExpressMethod";

@Prefix('')
export default class StreamController {
	@AuthMiddleware()
	@Get('/streaming')
	loadStream(req, res): any {
		res.send("streaming")
	}
	
	@Get('/stream/save')
	saveStream(req, res): any {
		res.send("save streaming")
	}
	
	@AuthMiddleware()
	@Get('/api/stream/save')
	saveAPIStream(req, res): any {
		res.send("save streaming")
	}
	
};

