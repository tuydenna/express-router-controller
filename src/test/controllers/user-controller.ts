import {Body, Get, Param, Post, Prefix, Put, Req, Res} from "@decorators/ExpressMethod";
import UserDto from "@test/dto/user.dto";

@Prefix("/users")
export default class A {
    @Get("/:id/:name")
    get(@Param("id") id: string, @Param() params: string, @Res() res: Response) {
        return params
    }

    @Post("")
    post(@Body() data: UserDto) {
        return data;
    }

    @Put("")
    update(req, res) {
        return res;
    }

}


