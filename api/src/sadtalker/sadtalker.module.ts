import { Module } from '@nestjs/common';
import { SadTalkerService } from './sadtalker.service';
import { SadTalkerController } from './sadtalker.controller';

@Module({
  providers: [SadTalkerService],
  controllers: [SadTalkerController]
})
export class SadTalkerModule {}
