import {Get, Middleware, Post, Prefix} from "@decorators/ExpressMethod";
import authMiddleware from "@decorators/AuthMiddleware";

@Prefix("/users")
export default class A {
    @Post("")
    post(req, res) {
        res.status(200).json({})
    }

    @Middleware(authMiddleware)
    del() {

    }

    @Get("")
    get(req, res){
      res.end();
    }

}


