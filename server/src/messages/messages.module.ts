import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UsersModule
  ],
  providers: [MessagesService],
  exports: [MessagesService]
})
export class MessagesModule { }
