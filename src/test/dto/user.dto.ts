import {ToNumber, Transform} from "@decorators/class-tranfrom";

export default class UserDto {
    @Transform(ToNumber)
    searchKey: string;

    @Transform(ToNumber)
    take: number = 5;
}
