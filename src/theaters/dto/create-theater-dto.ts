import { IsNotEmpty, IsString } from "class-validator";

export class CreateTheaterDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsString()
    location: string
}