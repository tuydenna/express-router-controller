import {Transform} from "@decorators/ExpressMethod";

export default class UserDto {
    @Transform(toNum)
    searchKey: string;

    @Transform(toNum)
    take: number = 5;
}

function toNum(val) {
    return +val
}