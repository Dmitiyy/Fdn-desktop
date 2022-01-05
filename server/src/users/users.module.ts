import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConferencesModule } from 'src/conferences/conferences.module';
import { Conference, ConferenceSchema } from 'src/conferences/schemas/conference.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConferencesModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      // { name: Conference.name, schema: ConferenceSchema }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
