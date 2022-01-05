import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConferencesController } from './conferences.controller';
import { ConferencesService } from './conferences.service';
import { Conference, ConferenceSchema } from './schemas/conference.schema';

@Module({
  controllers: [ConferencesController],
  providers: [ConferencesService],
  exports: [ConferencesService],
  imports: [MongooseModule.forFeature([{ name: Conference.name, schema: ConferenceSchema }])],
})
export class ConferencesModule { }
