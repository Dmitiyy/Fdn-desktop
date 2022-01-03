import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Conference, ConferenceSchema } from 'src/conferences/schemas/conference.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Conference.name, schema: ConferenceSchema }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
