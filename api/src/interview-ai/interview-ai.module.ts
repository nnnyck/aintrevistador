import { Module } from '@nestjs/common';
import { InterviewAiService } from './interview-ai.service';
import { InterviewAiController } from './interview-ai.controller';
import { ConfigModule } from '@nestjs/config';
import { PiperModule } from 'src/piper/piper.module';

@Module({
  imports: [ConfigModule, PiperModule],
  controllers: [InterviewAiController],
  providers: [InterviewAiService],
  exports: [InterviewAiService],
})
export class InterviewAiModule {}
