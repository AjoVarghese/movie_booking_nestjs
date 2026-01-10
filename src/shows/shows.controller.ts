import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('shows')
export class ShowsController {
    constructor(private readonly showsService: ShowsService){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    createShow(@Body() body) {
        return this.showsService.createShow(body)
    }

    @Get('by-movie') 
    getShowsByMovie(@Query('movieId') movieId: string) {
        return this.showsService.getShowsByMovie(movieId)
    }

    @Get('by-screen')
    getShowsByScreen(@Query('screenId') screenId: string) {
        return this.showsService.getShowsByScreen(screenId)
    }
}
