import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { SadTalkerService } from './sadtalker.service';
import { SadTalkerDto } from './dto/sadtalker.dto';

@ApiTags('SadTalker')
@Controller('sadtalker')
export class SadTalkerController {
  constructor(private readonly sadTalkerService: SadTalkerService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SadTalkerDto })
  async generateVideo(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    const image = files.find(f => f.mimetype.startsWith('image/'));
    const audio = files.find(f => f.mimetype.startsWith('audio/'));

    if (!image || !audio) {
      return res.status(400).json({ error: 'Envie uma imagem e um arquivo de áudio (.wav).' });
    }

    const videoPath = await this.sadTalkerService.generateVideo(image, audio);
    return res.download(videoPath);
  }
}
