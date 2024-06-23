import { Test, TestingModule } from '@nestjs/testing';
import { StorePrideService } from './store-pride.service';

describe('StorePrideService', () => {
  let service: StorePrideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorePrideService],
    }).compile();

    service = module.get<StorePrideService>(StorePrideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
