import { Test, TestingModule } from '@nestjs/testing';
import { Demo2024Service } from './demo2024.service';

describe('Demo2024Service', () => {
  let service: Demo2024Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Demo2024Service],
    }).compile();

    service = module.get<Demo2024Service>(Demo2024Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
