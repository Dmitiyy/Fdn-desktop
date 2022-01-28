import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { MessagesService } from './messages/messages.service';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class AppGateway implements OnGatewayConnection {
  constructor(
    private readonly messagesService: MessagesService
  ) { }

  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    client.on('events', (data: CreateMessageDto) => { client.join(data.authorId) });
  }

  @SubscribeMessage('events')
  async handleEvent(client: Socket, data: CreateMessageDto): Promise<void> {
    const message = await this.messagesService.createMessage(data);
    this.server.in(data.authorId).emit('events', message);
  }
}