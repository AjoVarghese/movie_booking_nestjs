import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
}

@Schema({ timestamps: true })
export class ShowSeat extends Document {

  @Prop({ type: Types.ObjectId, ref: 'Show', required: true })
  showId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seat', required: true })
  seatId: Types.ObjectId;

  @Prop({ enum: SeatStatus, default: SeatStatus.AVAILABLE })
  status: SeatStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  bookedBy?: Types.ObjectId;
}

export const ShowSeatSchema = SchemaFactory.createForClass(ShowSeat);
