import { Module } from '@nestjs/common';
import { PiperModule } from './piper/piper.module';
import { SadTalkerModule } from './sadtalker/sadtalker.module';

@Module({
  imports: [PiperModule, SadTalkerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
