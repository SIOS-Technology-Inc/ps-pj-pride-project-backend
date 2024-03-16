import { Test, TestingModule } from '@nestjs/testing';
import { SlController } from './sl.controller';

describe('SlController', () => {
  let controller: SlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlController],
    }).compile();

    controller = module.get<SlController>(SlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
