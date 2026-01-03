import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    // @UseGuards(JwtAuthGuard)
    // @Get('protected')
    // getProtectedMovies() {
    //     return {message: 'Only logged users can access'}
    // }

    // @Get('public')
    // getPublicMovies() {
    //     return {message: 'movies'}
    // }

    @Post('add')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    createMovie(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.createMovie(createMovieDto)
    }

    @Get()
    getAllMovies() {
        console.log('getAllMovies')
        return this.moviesService.getAllMovies()
    }

    @Get(':id')
    getMovieById(@Param('id') id: string) {
        console.log('getMovieById', id)
        return this.moviesService.getMovieById(id)
    }
}
