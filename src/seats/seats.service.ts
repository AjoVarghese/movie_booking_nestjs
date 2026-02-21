import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seat, SeatDocument } from './seat.schema';
import { SeatStatus } from 'src/common/enums/seat.enum';

@Injectable()
export class SeatsService {
  constructor(
    @InjectModel(Seat.name)
    private seatModel: Model<SeatDocument>,
  ) {}


  async createSeatsForScreen(
    screenId: string,
    rows: string[],
    seatsPerRow: number,
  ) {
    // const seats = [];
    const seats: {
        row: string;
        number: number;
        screenId: string;
    }[] = [];


    for (const row of rows) {
      for (let i = 1; i <= seatsPerRow; i++) {
        seats.push({
          row,
          number: i,
          screenId,
        });
      }
    }

    return this.seatModel.insertMany(seats);
  }

  async getSeatsByScreen(screenId: string) {
    return this.seatModel.find({ screenId }, { _id: 1 }).sort({ row: 1, number: 1 });
  }

  async bookSeat(seatId: string) {
    const seat = await this.seatModel.findById(seatId);

    if (!seat) {
      throw new BadRequestException('Seat not found');
    }

    if (seat.status === SeatStatus.BOOKED) {
      throw new BadRequestException('Seat already booked');
    }

    seat.status = SeatStatus.BOOKED;
    return seat.save();
  }
}
