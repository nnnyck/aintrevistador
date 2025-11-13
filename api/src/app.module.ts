import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PiperModule } from './piper/piper.module';
import { SadTalkerModule } from './sadtalker/sadtalker.module';
import { InterviewAiModule } from './interview-ai/interview-ai.module';
import { ListenerModule } from './listener/listener.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PiperModule,
    SadTalkerModule,
    InterviewAiModule,
    ListenerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
