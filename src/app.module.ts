import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { BookingsModule } from './bookings/bookings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TheatersModule } from './theaters/theaters.module';
import { SeatsModule } from './seats/seats.module';
import { ScreensModule } from './screens/screens.module';
import { ShowsModule } from './shows/shows.module';
import { ShowSeatsModule } from './show-seats/show-seats.module';

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
    // RedisModule.forRoot({
    //   type: 'single',
    //   options: {
    //     host: '127.0.0.1',
    //     port: 6379,
    //   },
    // }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        options: {
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        },
      }),
    }),
    AuthModule, 
    UsersModule, 
    MoviesModule, 
    BookingsModule, TheatersModule, SeatsModule, ScreensModule, ShowsModule, ShowSeatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
