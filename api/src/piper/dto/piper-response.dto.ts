import { ApiProperty } from '@nestjs/swagger';

export class PiperResponseDto {
  @ApiProperty({ description: 'UUID único do arquivo de áudio gerado' })
  uuid: string;

  @ApiProperty({ description: 'Nome do arquivo de áudio gerado' })
  fileName: string;
}
