import { Injectable } from '@nestjs/common';
import { PromptAoaiService } from 'src/prompt-aoai/prompt-aoai.service';
import { ResponseEmotionScoreDto } from './dto/response.dto';

@Injectable()
export class Demo2024Service {
  constructor(private readonly prompt: PromptAoaiService) {}

  async EmotionScoring(message: string): Promise<ResponseEmotionScoreDto> {
    const promptResult = await this.prompt.EmotionScorePrompt(message);
    const result = await this.prompt.EmotionScoreJsonFormatConverter(promptResult);
    return {
      score: result.totalScore,
      message: message,
      row: result,
    };
  }
}
