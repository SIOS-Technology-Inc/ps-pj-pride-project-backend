import { Test, TestingModule } from '@nestjs/testing';
import { PrideService } from './pride.service';

describe('PrideService', () => {
  let service: PrideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrideService],
    }).compile();

    service = module.get<PrideService>(PrideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
