import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { CreateTheaterDto } from './dto/create-theater-dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('theaters')
export class TheatersController {
    constructor(private readonly theatersService: TheatersService) {}

    @Post('add')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    createTheater(@Body() createTheaterDto: CreateTheaterDto) {
        return this.theatersService.createTheater(createTheaterDto)
    }

    @Get()
    getAllTheaters() {
        return this.theatersService.getAllTheaters()
    }

    @Get(':id')
    getTheaterById(@Param('id') id: string) {
        return this.theatersService.getTheaterById(id)
    }

}
