import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Theater {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    location: string;

    @Prop({default: true})
    isActive: boolean
}

export type TheaterDocument = Theater & Document
export const TheaterSchema = SchemaFactory.createForClass(Theater)