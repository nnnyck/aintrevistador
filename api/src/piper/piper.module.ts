import { Module } from '@nestjs/common';
import { PiperService } from './piper.service';
import { PiperController } from './piper.controller';

@Module({
  controllers: [PiperController],
  providers: [PiperService],
  exports: [PiperService],
})
export class PiperModule {}
