import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ShowSeat, SeatStatus } from './show-seat.schema';
import { SeatLockService } from './seat-lock.service';

@Injectable()
export class ShowSeatsService {
  constructor(
    @InjectModel(ShowSeat.name)
    private showSeatModel: Model<ShowSeat>,
    private seatLockService: SeatLockService,
  ) {}

  // ADMIN: create show seats
  // async createShowSeats(showId: string, seatIds: string[]) {
  //   const docs = seatIds.map(seatId => ({
  //     showId,
  //     seatId,
  //     status: SeatStatus.AVAILABLE,
  //   }));

  //   return this.showSeatModel.insertMany(docs);
  // }

  async createShowSeats(showId: string, seatIds: string[]) {
  const validSeatIds = seatIds.filter(id =>
    Types.ObjectId.isValid(id)
  );

  if (validSeatIds.length !== seatIds.length) {
    throw new BadRequestException('Invalid seatId found');
  }

  const docs = validSeatIds.map(seatId => ({
    showId,
    seatId,
    status: SeatStatus.AVAILABLE,
  }));

  return this.showSeatModel.insertMany(docs);
}

  // PUBLIC: view seats
  async getSeatsByShow(showId: string) {
    console.log('getSeatsByShow',showId)
    return this.showSeatModel
      .find({ showId })
      .populate('seatId');
  }

  // USER: lock seat
  // async lockSeat(showSeatId: string, userId: string) {
  //   const showSeat = await this.showSeatModel.findById(showSeatId);
  //   if (!showSeat) throw new BadRequestException('Seat not found');

  //   const locked = await this.seatLockService.lockSeat(
  //     showSeat.showId.toString(),
  //     showSeat.seatId.toString(),
  //     userId,
  //   );

  //   if (!locked) {
  //     throw new BadRequestException('Seat already locked');
  //   }

  //   return { message: 'Seat locked successfully' };
  // }

 async lockSeats(showSeatIds: string[], userId: string) {
  const lockedSeats: string[] = [];
  const failedSeats: string[] = [];

  for (const showSeatId of showSeatIds) {
    const showSeat = await this.showSeatModel.findById(showSeatId);
    if (!showSeat) {
      failedSeats.push(showSeatId);
      continue;
    }

    const locked = await this.seatLockService.lockSeat(
      showSeat.showId.toString(),
      showSeat.seatId.toString(),
      userId,
    );

    if (locked) lockedSeats.push(showSeatId);
    else failedSeats.push(showSeatId);
  }

  if (failedSeats.length) {
    throw new BadRequestException({
      message: 'Some seats already locked',
      lockedSeats,
      failedSeats,
    });
  }

  return { message: 'Seats locked successfully', lockedSeats };
}



  // USER: confirm booking
  // async bookSeat(showSeatId: string, userId: string) {
  //   const showSeat = await this.showSeatModel.findById(showSeatId);
  //   if (!showSeat) throw new BadRequestException('Seat not found');

  //     const isLocked = await this.seatLockService.isLocked(
  //       showSeat.showId.toString(),
  //       showSeat.seatId.toString(),
  //     );

  //     if (!isLocked) {
  //       throw new BadRequestException('Seat is not locked');
  //     }

  //   await this.seatLockService.unlockSeat(
  //     showSeat.showId.toString(),
  //     showSeat.seatId.toString(),
  //     userId,
  //   );

  //   showSeat.status = SeatStatus.BOOKED;
  //   showSeat.bookedBy = userId as any;

  //   return showSeat.save();
  // }

  async bookSeats(showSeatIds: string[], userId: string) {
  const bookedSeats: string[] = [];

  for (const showSeatId of showSeatIds) {
    const showSeat = await this.showSeatModel.findById(showSeatId);
    if (!showSeat) continue;

    const isLocked = await this.seatLockService.isLocked(
      showSeat.showId.toString(),
      showSeat.seatId.toString(),
    );

    if (!isLocked) {
      throw new BadRequestException('One or more seats are not locked');
    }

    showSeat.status = SeatStatus.BOOKED;
    showSeat.bookedBy = userId as any;
    await showSeat.save();

    await this.seatLockService.unlockSeat(
      showSeat.showId.toString(),
      showSeat.seatId.toString(),
      userId,
    );

    bookedSeats.push(showSeatId);
  }

  return { message: 'Seats booked successfully', bookedSeats };
}


}
