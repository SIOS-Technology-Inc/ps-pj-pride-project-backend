import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoContentException } from 'src/common/exception/NoContent.exception';
import { GoogleIdTokenVerifyGrantIdGuard } from 'src/common/guard/google-id-token-verify-grant-id/google-id-token-verify-grant-id.guard';
import { ResponsePrideContentDto } from 'src/pride-user/dto/response.dto';
import { RequestThumbsUpPrideDto } from './dto/request.dto';
import { PrideService } from './pride.service';

@ApiTags('自慢プロジェクト/自慢の取得・いいね更新')
@Controller('api/prides')
export class PrideController {
  constructor(private readonly service: PrideService) {}

  @ApiResponse({ status: 200, description: 'OK', type: ResponsePrideContentDto })
  @Get()
  async getPrideWithinOneMonth(): Promise<ResponsePrideContentDto> {
    const prides = await this.service.getPridesWithinOneMonth();
    return { prides: prides };
  }
  @ApiResponse({ status: 200, description: 'OK', type: ResponsePrideContentDto })
  @Get('/all')
  async getPrideAll(): Promise<ResponsePrideContentDto> {
    const prides = await this.service.getPrideAll();
    return { prides: prides };
  }

  @ApiResponse({ status: 200, description: 'OK', type: ResponsePrideContentDto })
  @Get('/ranking')
  async getPrideWithinOneMonthRanking(): Promise<ResponsePrideContentDto> {
    // top 3
    const prides = await this.service.getPrideWithinOneMonthRanking();
    return { prides: prides };
  }

  @ApiResponse({ status: 200, description: 'OK', type: ResponsePrideContentDto })
  @Get('/past')
  async getPridePast(): Promise<ResponsePrideContentDto> {
    const prides = await this.service.getPridePast();
    return { prides: prides };
  }

  @ApiHeader({
    name: 'google-certification',
    description: '{idToken}',
  })
  @ApiResponse({ status: 201, description: 'Updated' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @UseGuards(GoogleIdTokenVerifyGrantIdGuard)
  // @UseGuards(DummyGuardGuard)
  @Patch('/:uid')
  async thumbUpPride(@Param('uid') uid: string, @Body() request: RequestThumbsUpPrideDto) {
    const isExistPride = await this.service.isExistPride(uid);
    if (!isExistPride) throw new NoContentException();
    await this.service.patchThumbsupPride(uid, request);
  }
}
