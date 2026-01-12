import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShowSeatsService } from './show-seats.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('show-seats')
export class ShowSeatsController {
  constructor(private readonly service: ShowSeatsService) {}

  // ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  createShowSeats(@Body() body) {
    return this.service.createShowSeats(body.showId, body.seatIds);
  }

  // PUBLIC
  @Get()
  getSeats(@Query('showId') showId: string) {
    console.log('getSeats',showId)
    return this.service.getSeatsByShow(showId);
  }

  // USER
  @UseGuards(JwtAuthGuard)
  @Post('lock')
  // lockSeat(@Body('showSeatId') showSeatId: string, @Req() req) {
  //   return this.service.lockSeat(showSeatId, req.user.userId);
  // }
  lockSeats(@Body('showSeatIds') showSeatIds: string[], @Req() req) {
  return this.service.lockSeats(showSeatIds, req.user.userId);
}

  // USER
  @UseGuards(JwtAuthGuard)
  @Post('book')
  // bookSeat(@Body('showSeatId') showSeatId: string, @Req() req) {
  //   return this.service.bookSeat(showSeatId, req.user.userId);
  // }
  bookSeats(@Body('showSeatIds') showSeatIds: string[], @Req() req) {
    return this.service.bookSeats(showSeatIds, req.user.userId);
  }
}
