import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UsersModule } from 'src/users/users.module';
import { ConferencesController } from './conferences.controller';
import { ConferencesService } from './conferences.service';
import { Conference, ConferenceSchema } from './schemas/conference.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conference.name, schema: ConferenceSchema }]),
    CloudinaryModule,
    forwardRef(() => UsersModule)
  ],
  controllers: [ConferencesController],
  providers: [ConferencesService],
  exports: [ConferencesService],
})
export class ConferencesModule { }
