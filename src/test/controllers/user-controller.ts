import {Body, Get, Param, Post, Prefix, Res} from "@decorators/ExpressMethod";

@Prefix("/users")
export default class A {
    @Post("")
    post(@Body() data, @Res() res) {
        console.log(data);
        return data;
    }

    @Get("/:id/:name")
    get(@Param("id") id: string, @Param() params: string, @Res() res: Response) {
        return params
    }

}


