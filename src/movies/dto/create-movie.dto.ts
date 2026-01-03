import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    title: string

    @IsOptional()
    description?: string

    @IsOptional()
    @IsNumber()
    duration?: number

    @IsOptional()
    language?: string

    @IsOptional()
    genre?: string

    @IsOptional()
    releaseDate?: string

}