import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Types } from "mongoose";
import { SeatStatus } from "src/common/enums/seat.enum";

export type SeatDocument = Seat & Document

@Schema({timestamps: true})
export class Seat {

    @Prop({required: true})
    row: string;

    @Prop({required: true})
    number: number;

    @Prop({type: Types.ObjectId, ref: 'Screen', required: true})
    screenId: ObjectId;

    @Prop({type: String, enum: SeatStatus, default: SeatStatus.AVAILABLE})
    status: SeatStatus
}

export const SeatSchema = SchemaFactory.createForClass(Seat)

//prevent seat number dupplication in same screen
SeatSchema.index({row: 1, number: 1, screenId: 1}, {unique: true})