import { ApiProperty } from '@nestjs/swagger';

export class CreatePiperDto {
  @ApiProperty({
    description: 'Texto que será convertido em áudio',
    example: 'Olá, bem-vindo à demonstração do Piper!',
  })
  text: string;
}
