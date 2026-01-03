import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/common/enums/role.enum";

export type UserDocument = User & Document

@Schema({timestamps: true})
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string

    @Prop({enum: Role, default: Role.USER})
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User)