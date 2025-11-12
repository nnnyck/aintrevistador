import { Test, TestingModule } from '@nestjs/testing';
import { SadtalkerController } from './sadtalker.controller';

describe('SadtalkerController', () => {
  let controller: SadtalkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SadtalkerController],
    }).compile();

    controller = module.get<SadtalkerController>(SadtalkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
