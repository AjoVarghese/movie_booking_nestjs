import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { BookingsModule } from './bookings/bookings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TheatersModule } from './theaters/theaters.module';
import { SeatsModule } from './seats/seats.module';
import { ScreensModule } from './screens/screens.module';
import { ShowsModule } from './shows/shows.module';

@Module({
  imports: [
    //for loading env
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // MongooseModule.forRoot('mongodb://localhost:27017/movie_booking_nestjs_db'),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    AuthModule, 
    UsersModule, 
    MoviesModule, 
    BookingsModule, TheatersModule, SeatsModule, ScreensModule, ShowsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
