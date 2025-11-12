import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PiperService {
  private readonly piperUrl = 'http://localhost:5000/';

  async gerarAudio(text: string): Promise<string> {
    try {
      const response = await axios.post(this.piperUrl, { text }, { responseType: 'arraybuffer' });

      const outputDir = path.resolve('../piper/audio');
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

      const filePath = path.join(outputDir, `${uuidv4()}.wav`);
      fs.writeFileSync(filePath, Buffer.from(response.data));

      return filePath;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao gerar áudio com o Piper.');
    }
  }

  async gerarAudioV2(text: string): Promise<{ uuid: string; fileName: string }> {
    try {
      const response = await axios.post(this.piperUrl, { text }, { responseType: 'arraybuffer' });

      const outputDir = path.resolve('../piper/audio');
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

      const uuid = uuidv4();
      const fileName = `${uuid}.wav`;
      const filePath = path.join(outputDir, fileName);

      fs.writeFileSync(filePath, Buffer.from(response.data));

      return { uuid, fileName };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao gerar áudio com o Piper.');
    }
  }
}
