import {Body, Get, Param, Post, Prefix, Put, Res} from "@decorators/ExpressMethod";

@Prefix("/users")
export default class A {
    @Get("/:id/:name")
    get(@Param("id") id: string, @Param() params: string, @Res() res: Response) {
        return params
    }

    @Post("")
    post(@Body() data, @Res() res) {
        console.log(data);
        return data;
    }

    @Put("")
    update(req, res) {
        console.log(req, res);
        return res;
    }

}


