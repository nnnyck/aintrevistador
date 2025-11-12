import { Controller, Post, Body, Res } from '@nestjs/common';
import { PiperService } from './piper.service';
import { CreatePiperDto } from './dto/create-piper.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import type { Response } from 'express';
import * as path from 'path';
import { PiperResponseDto } from './dto/piper-response.dto';

@ApiTags('Piper')
@Controller('piper')
export class PiperController {
  constructor(private readonly piperService: PiperService) {}

  @Post()
  @ApiBody({ type: CreatePiperDto })
  @ApiResponse({ status: 201, description: 'Retorna o arquivo de áudio gerado.' })
  async gerar(@Body() createPiperDto: CreatePiperDto, @Res() res: Response) {
    const filePath = await this.piperService.gerarAudio(createPiperDto.text);

    const fileName = path.basename(filePath);
    res.download(filePath, fileName);
  }

   @Post('path')
  @ApiBody({ type: CreatePiperDto })
  @ApiResponse({ status: 201, description: 'Retorna UUID e nome do arquivo de áudio gerado.', type: PiperResponseDto })
  async gerarUuid(@Body() createPiperDto: CreatePiperDto): Promise<PiperResponseDto> {
    return this.piperService.gerarAudioV2(createPiperDto.text);
  }


}
