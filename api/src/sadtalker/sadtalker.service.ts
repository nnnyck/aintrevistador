import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { spawn } from 'child_process';
import type { Express } from 'express';

@Injectable()
export class SadTalkerService {
  private inputsDir = join(__dirname, '../../../sadtalker/inputs');   // host path
  private outputsDir = join(__dirname, '../../../sadtalker/outputs'); // host path
  private containerName = 'sadtalker'; // nome do container definido no docker-compose

  async generateVideo(
    image: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<string> {
    // garante que as pastas existam
    if (!existsSync(this.inputsDir)) mkdirSync(this.inputsDir, { recursive: true });
    if (!existsSync(this.outputsDir)) mkdirSync(this.outputsDir, { recursive: true });

    const imagePathHost = join(this.inputsDir, image.originalname);
    const audioPathHost = join(this.inputsDir, audio.originalname);

    // salva os arquivos enviados via Swagger
    writeFileSync(imagePathHost, image.buffer);
    writeFileSync(audioPathHost, audio.buffer);

    // caminhos dentro do container
    const imagePathContainer = `/app/inputs/${image.originalname}`;
    const audioPathContainer = `/app/inputs/${audio.originalname}`;
    const outputsDirContainer = '/app/outputs';

    return new Promise((resolve, reject) => {
      const args = [
        'exec', '-i', this.containerName,
        'python3', '/app/SadTalker/inference.py',
        '--driven_audio', audioPathContainer,
        '--source_image', imagePathContainer,
        '--result_dir', outputsDirContainer,
        '--expression_scale', '1.0',
        '--pose_style', '0',
        '--batch_size', '1',
        '--still',
      ];

      const process = spawn('docker', args);

      process.stdout.on('data', data => console.log(data.toString()));
      process.stderr.on('data', data => console.error(data.toString()));

      process.on('close', (code) => {
        if (code === 0) {
          try {
            const videoFile = this.getLatestFile(this.outputsDir, '.mp4');
            resolve(videoFile);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error(`SadTalker container exited with code ${code}`));
        }
      });
    });
  }

  private getLatestFile(dir: string, ext: string): string {
    const files = readdirSync(dir)
      .filter(f => f.endsWith(ext))
      .map(f => ({
        name: f,
        time: statSync(join(dir, f)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time);

    if (files.length === 0) throw new Error('Nenhum arquivo de vídeo foi gerado.');

    return join(dir, files[0].name);
  }
}
