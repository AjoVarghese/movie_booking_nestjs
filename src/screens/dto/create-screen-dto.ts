import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScreenDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    theaterId: string

    @IsNotEmpty()
    @IsNumber()
    totalRows: number;

    @IsNotEmpty()
    @IsNumber()
    seatsPerRow: number
}