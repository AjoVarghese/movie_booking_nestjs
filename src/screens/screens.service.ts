import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Screen, ScreenDocument } from './screen.schema';
import { Model } from 'mongoose';
import { CreateScreenDto } from './dto/create-screen-dto';

@Injectable()
export class ScreensService {
    constructor(
        @InjectModel(Screen.name)
        private screenModal: Model<ScreenDocument> 
    ) {}


    async createScreen(createScreenDto: CreateScreenDto) {
        const screen = new this.screenModal(createScreenDto)
        return screen.save()
    }

    async getAllScreens() {
        return this.screenModal.find()
    }

    async getAllScreenByTheaterId(theaterId: string) {
        return this.screenModal.find({theaterId})
    }

    async getScreenById(id: string) {
        return this.screenModal.findById(id)
    }
}
