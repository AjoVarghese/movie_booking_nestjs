import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Show, ShowDocument } from './show.schema';
import { Model } from 'mongoose';

@Injectable()
export class ShowsService {
    constructor(
        @InjectModel(Show.name)
        private showModel: Model<ShowDocument>
    ){}

    async createShow(data: {
        movieId: string;
        theaterId: string;
        screenId: string;
        showDate: string;
        startTime: string;
        endTime: string;
    }) {
        return this.showModel.create(data)
    }

    async getShowsByMovie(movieId: string) {
        return this.showModel
        .find({movieId, isActive: true})
        .populate('theaterId')
        .populate('screenId')
    }

    async getShowsByScreen(screenId: string) {
        return this.showModel.find({screenId})
    }
}
