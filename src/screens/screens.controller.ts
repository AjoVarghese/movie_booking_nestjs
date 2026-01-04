import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreateScreenDto } from './dto/create-screen-dto';

@Controller('screens')
export class ScreensController {
    constructor(private readonly screensService: ScreensService) {}

    @Post('add')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    createScreen(@Body() createScreenDto: CreateScreenDto) {
        return this.screensService.createScreen(createScreenDto)
    }

    @Get()
    getAllScreens(@Query('theaterId') theaterId?: string) {
        if(theaterId) {
            return this.screensService.getAllScreenByTheaterId(theaterId)
        }
        return this.screensService.getAllScreens()
    }


    @Get(':id')
    getScreenById(@Param('id') id: string) {
        return this.screensService.getScreenById(id)
    }
}
