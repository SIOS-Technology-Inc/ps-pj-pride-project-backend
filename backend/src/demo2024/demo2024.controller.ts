import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GoogleIdTokenVerifyGrantIdGuard } from 'src/common/guard/google-id-token-verify-grant-id/google-id-token-verify-grant-id.guard';
import { Demo2024Service } from './demo2024.service';
import { RequestEmotionScoreDto } from './dto/request.dto';
import { ResponseEmotionScoreDto } from './dto/response.dto';

@Controller('api/demo2024')
@UseGuards(GoogleIdTokenVerifyGrantIdGuard)
export class Demo2024Controller {
  constructor(private readonly service: Demo2024Service) {}

  @Post('emotion-score')
  async postEmotionScore(@Body() request: RequestEmotionScoreDto): Promise<ResponseEmotionScoreDto> {
    const emotionScore = await this.service.EmotionScoring(request.message);
    return emotionScore;
  }
}
