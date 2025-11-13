import { Test, TestingModule } from '@nestjs/testing';
import { InterviewAiService } from './interview-ai.service';

describe('InterviewAiService', () => {
  let service: InterviewAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewAiService],
    }).compile();

    service = module.get<InterviewAiService>(InterviewAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
