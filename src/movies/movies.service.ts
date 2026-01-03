import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie.name)
        private readonly movieModal: Model<MovieDocument>
    ) {}

    async createMovie(createMovieDto: CreateMovieDto) {
        const movie = new this.movieModal(createMovieDto)
        return movie.save()
    }

    async getAllMovies() {
        return this.movieModal.find({isActive: true})
    }

    async getMovieById(id: string) {
        console.log('id',id)
        return this.movieModal.findById(id)
    }
}
