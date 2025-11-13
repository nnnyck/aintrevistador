import { Test, TestingModule } from '@nestjs/testing';
import { InterviewAiController } from './interview-ai.controller';

describe('InterviewAiController', () => {
  let controller: InterviewAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewAiController],
    }).compile();

    controller = module.get<InterviewAiController>(InterviewAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
