import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    private readonly userService: UsersService,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) { }

  async createMessage(data: CreateMessageDto): Promise<Message> {
    const createdMessage = await this.messageModel.create({
      text: data.text, authorId: data.authorId, createdAt: Date.now()
    });
    await this.userService.addMessageUser(data.authorId, createdMessage);
    return createdMessage;
  }
}
