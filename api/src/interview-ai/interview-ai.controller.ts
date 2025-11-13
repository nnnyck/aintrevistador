import { Controller, Post, Body } from '@nestjs/common';
import { InterviewAiService } from './interview-ai.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { InterviewResponseDto } from './dto/interview-response.dto';

@ApiTags('Interviewer AI')
@Controller('interviewer-ai')
export class InterviewAiController {
  constructor(private readonly interviewAiService: InterviewAiService) {}

  @Post()
  @ApiOperation({
    summary: 'Gera uma resposta do entrevistador virtual',
    description: 'Recebe texto do usuário e retorna a resposta da IA simulando uma entrevista de emprego.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resposta gerada com sucesso.',
    type: InterviewResponseDto,
  })
  async handleInterview(@Body() body: CreateInterviewDto): Promise<InterviewResponseDto> {
    const reply = await this.interviewAiService.generateReply(body);
    return { reply };
  }
}
