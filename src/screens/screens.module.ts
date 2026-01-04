import { Module } from '@nestjs/common';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Screen, ScreenSchema } from './screen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Screen.name, schema: ScreenSchema}
    ]),
  ],
  controllers: [ScreensController],
  providers: [ScreensService],
  exports: [ScreensService]
})
export class ScreensModule {}
