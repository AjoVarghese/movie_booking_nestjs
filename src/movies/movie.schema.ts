import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type MovieDocument = Movie & Document;

@Schema({timestamps: true})
export class Movie {
    
    @Prop({required: true})
    title: string

    @Prop()
    description: string

    @Prop()
    duration: number

    @Prop()
    language: string

    @Prop()
    genre: string

    @Prop()
    releaseDate: Date

    @Prop({default: true})
    isActive: boolean
}

export const MovieSchema = SchemaFactory.createForClass(Movie)
