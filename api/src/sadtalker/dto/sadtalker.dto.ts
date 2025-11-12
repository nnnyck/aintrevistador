import { ApiProperty } from '@nestjs/swagger';

export class SadTalkerDto {
  @ApiProperty({
    description: 'Imagem da pessoa',
    type: 'string',
    format: 'binary',
  })
  image: any;

  @ApiProperty({
    description: 'Áudio em formato WAV',
    type: 'string',
    format: 'binary',
  })
  audio: any;
}
