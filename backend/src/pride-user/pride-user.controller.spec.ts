import { Test, TestingModule } from '@nestjs/testing';
import { PrideUserController } from './pride-user.controller';

describe('PrideUserController', () => {
  let controller: PrideUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrideUserController],
    }).compile();

    controller = module.get<PrideUserController>(PrideUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
