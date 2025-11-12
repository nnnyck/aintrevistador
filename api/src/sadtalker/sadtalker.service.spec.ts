import { Test, TestingModule } from '@nestjs/testing';
import { SadtalkerService } from './sadtalker.service';

describe('SadtalkerService', () => {
  let service: SadtalkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SadtalkerService],
    }).compile();

    service = module.get<SadtalkerService>(SadtalkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
