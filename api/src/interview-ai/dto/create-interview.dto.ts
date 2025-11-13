import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateInterviewDto {
  @ApiProperty({
    description: 'Texto enviado pelo usuário durante a simulação de entrevista',
    example: 'Olá, estou pronto para começar a entrevista.',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Contexto adicional da conversa (opcional)',
    example: 'O usuário acabou de se apresentar.',
    required: false,
  })
  @IsOptional()
  @IsString()
  context?: string;
}
