import { Module } from '@nestjs/common';
import { ListenerService } from './listener.service';
import { ListenerGateway } from './listener.gateway';
import { ListenerController } from './listener.controller';

@Module({
  controllers: [ListenerController],
  providers: [ListenerService, ListenerGateway],
  exports: [ListenerService],
})
export class ListenerModule {}
