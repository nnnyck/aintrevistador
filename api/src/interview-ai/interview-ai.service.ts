import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { PiperService } from 'src/piper/piper.service';

@Injectable()
export class InterviewAiService {
  private readonly logger = new Logger(InterviewAiService.name);
  private readonly ai: GoogleGenAI;
  private readonly model = 'gemini-2.5-flash';

  constructor(private readonly configService: ConfigService,
    private readonly piperService: PiperService
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) throw new Error('GEMINI_API_KEY não configurada no .env');

    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateReply(body: CreateInterviewDto): Promise<string> {
    try {
      // Monta o prompt com contexto, se existir
      const contents = body.context
        ? `Contexto: ${body.context}\nUsuário: ${body.text}`
        : body.text;


      const response = await this.ai.models.generateContent({
        model: this.model,
        contents,
        config: {
          systemInstruction:
            'Você é um entrevistador de RH simpático e profissional. ' +
            'Faça perguntas naturais e responda de forma humana, simulando uma entrevista de emprego real.',
          temperature: 0.7,
          thinkingConfig: {
            thinkingBudget: 0, // desativa pensamento (mais rápido)
          },
        },
      });

      return response.text?.trim() || 'Não consegui gerar uma resposta.';
    } catch (error) {
      this.logger.error('Erro ao gerar resposta com o Gemini:', error);
      return 'Desculpe, houve um erro ao processar sua resposta.';
    }
  }
}
