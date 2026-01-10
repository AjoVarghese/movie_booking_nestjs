import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ShowDocument = Show & Document

@Schema({timestamps: true})
export class Show {
    @Prop({type: Types.ObjectId, ref: 'Movie', required: true})
    movieId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Theater', required: true})
    theaterId: Types.ObjectId

    @Prop({type: Types.ObjectId, ref: 'Screen', required: true})
    screenId: Types.ObjectId;

    @Prop({required: true})
    showDate: string;

    @Prop({required: true})
    startTime: string;

    @Prop({required: true})
    endTime: string;

    @Prop({default: true})
    isActive: boolean


}

export const ShowSchema = SchemaFactory.createForClass(Show)