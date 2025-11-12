import { Test, TestingModule } from '@nestjs/testing';
import { PiperService } from './piper.service';

describe('PiperService', () => {
  let service: PiperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiperService],
    }).compile();

    service = module.get<PiperService>(PiperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
