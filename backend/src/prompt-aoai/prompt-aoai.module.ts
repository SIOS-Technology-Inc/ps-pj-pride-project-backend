import { Global, Module } from '@nestjs/common';
import { PromptAoaiService } from './prompt-aoai.service';

@Global()
@Module({
  providers: [PromptAoaiService],
  exports: [PromptAoaiService],
})
export class PromptAoaiModule {}
