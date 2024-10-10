import { Test, TestingModule } from '@nestjs/testing';
import { PromptAoaiService } from './prompt-aoai.service';

describe('PromptAoaiService', () => {
  let service: PromptAoaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromptAoaiService],
    }).compile();

    service = module.get<PromptAoaiService>(PromptAoaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
