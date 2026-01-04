import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Types } from "mongoose";

export type ScreenDocument = Screen & Document

@Schema({timestamps: true})
export class Screen {
    @Prop({required: true})
    name: string

    @Prop({type: Types.ObjectId, ref: 'Theater', required: true})
    theaterId: ObjectId

    @Prop({required: true})
    totalRows: number

    @Prop({required: true})
    seatsPerRow: number
}

export const ScreenSchema = SchemaFactory.createForClass(Screen)