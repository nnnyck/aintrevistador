import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ListenerService } from './listener.service';

interface AudioChunkDto {
  sessionId: string;
  audioBuffer: ArrayBuffer;
}

@WebSocketGateway({ 
  namespace: '/listener',
  cors: { origin: '*' }
})
export class ListenerGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly listenerService: ListenerService) {}

  @SubscribeMessage('audio-chunk')
  handleAudio(@MessageBody() data: AudioChunkDto, @ConnectedSocket() client: Socket) {
    // já recebe ArrayBuffer puro do front
    this.listenerService.sendAudio(data.sessionId, data.audioBuffer);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    // aqui podemos limpar sessões se quisermos
  }
}
