import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createSeats(@Body() body: any) {
    return this.seatsService.createSeatsForScreen(
      body.screenId,
      body.rows,
      body.seatsPerRow,
    );
  }

  @Get('screen/:screenId')
  getSeats(@Param('screenId') screenId: string) {
    return this.seatsService.getSeatsByScreen(screenId);
  }

  @Patch('book/:seatId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  bookSeat(@Param('seatId') seatId: string) {
    return this.seatsService.bookSeat(seatId);
  }
}
