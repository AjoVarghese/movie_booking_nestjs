import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theater, TheaterDocument } from './theater.schema';
import { Model } from 'mongoose';
import { CreateTheaterDto } from './dto/create-theater-dto';

@Injectable()
export class TheatersService {
    constructor(
        @InjectModel(Theater.name)
        private readonly theaterModal: Model<TheaterDocument>
    ) {}

    async createTheater(createTheaterDto: CreateTheaterDto) {
        const theater = new this.theaterModal(createTheaterDto)
        return theater.save()
    }

    async getAllTheaters() {
        return this.theaterModal.find({isActive: true})
    }

    async getTheaterById(id: string) {
        return this,this.theaterModal.findById(id)
    }
}
