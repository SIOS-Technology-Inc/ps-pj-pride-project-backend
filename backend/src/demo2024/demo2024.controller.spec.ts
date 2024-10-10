import { Test, TestingModule } from '@nestjs/testing';
import { Demo2024Controller } from './demo2024.controller';

describe('Demo2024Controller', () => {
  let controller: Demo2024Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Demo2024Controller],
    }).compile();

    controller = module.get<Demo2024Controller>(Demo2024Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
