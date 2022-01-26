import {
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { MessagesService } from './messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class AppGateway {
  constructor(
    private readonly messagesService: MessagesService
  ) { }

  @SubscribeMessage('events')
  async handleEvent(client: Socket, data: CreateMessageDto): Promise<void> {
    const message = await this.messagesService.createMessage(data);
    client.emit('events', message);
  }
}