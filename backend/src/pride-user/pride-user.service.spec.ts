import { Test, TestingModule } from '@nestjs/testing';
import { PrideUserService } from './pride-user.service';

describe('PrideUserService', () => {
  let service: PrideUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrideUserService],
    }).compile();

    service = module.get<PrideUserService>(PrideUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
