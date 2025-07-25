import {Body, Get, Param, Post, Prefix, Put, Res} from "@decorators/express-method";
import UserDto from "@test/dto/user.dto";
import fs from "fs";
import path from "path";
import * as process from "node:process";

@Prefix("/users")
export default class A {
    @Get("/:id/:name")
    get(@Param("id") id: string, @Param() params: string, @Res() res: Response) {
        return params
    }

    @Post("")
    post(@Body() data: UserDto) {
        console.log(data);
        const buffer: Buffer = fs.readFileSync(path.join(process.cwd(), "text.txt"));
        return buffer.toString();
    }

    @Put("")
    update(req, res) {
        return res;
    }


}


