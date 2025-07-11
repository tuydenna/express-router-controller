import {Middleware, Post, Prefix, Put} from "@decorators/ExpressMethod";
import authMiddleware from "@decorators/AuthMiddleware";

@Prefix("/api")
export default class A {
    @Put("/users")
    @Middleware(authMiddleware)
    del() {

    }

    @Post("/users")
    post() {

    }
}


