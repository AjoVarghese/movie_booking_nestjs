import { Module } from '@nestjs/common';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Seat, SeatSchema } from './seat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Seat.name, schema: SeatSchema}
    ]),
  ],
  controllers: [SeatsController],
  providers: [SeatsService],
  exports: [SeatsService]
})
export class SeatsModule {}
