import { ApiProperty } from '@nestjs/swagger';

export class InterviewResponseDto {
  @ApiProperty({
    description: 'Resposta textual gerada pela IA entrevistadora',
    example: 'Ótimo! Pode me contar um pouco sobre sua experiência profissional?',
  })
  reply: string;
}
