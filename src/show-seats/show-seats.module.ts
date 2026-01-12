import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShowSeat, ShowSeatSchema } from './show-seat.schema';
import { ShowSeatsService } from './show-seats.service';
import { ShowSeatsController } from './show-seats.controller';
import { SeatLockService } from './seat-lock.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShowSeat.name, schema: ShowSeatSchema },
    ]),
  ],
  providers: [ShowSeatsService, SeatLockService],
  controllers: [ShowSeatsController],
})
export class ShowSeatsModule {}
