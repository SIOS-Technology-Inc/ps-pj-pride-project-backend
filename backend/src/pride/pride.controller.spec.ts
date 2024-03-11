import { Test, TestingModule } from '@nestjs/testing';
import { PrideController } from './pride.controller';

describe('PrideController', () => {
  let controller: PrideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrideController],
    }).compile();

    controller = module.get<PrideController>(PrideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
