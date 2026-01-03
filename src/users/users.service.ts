import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    create(data: Partial<User>) {
        return this.userModel.create(data);
    }

    findByEmail(email: string) {
        return this.userModel.findOne({email})
    }

    findById(id: string) {
        return this.userModel.findById(id).select('-password')
    }
}
