import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoContentException } from 'src/common/exception/NoContent.exception';
import { GoogleIdTokenVerifyGrantIdGuard } from 'src/common/guard/google-id-token-verify-grant-id/google-id-token-verify-grant-id.guard';
import { RequestPrideContentDto, RequestUserIDDto } from './dto/request.dto';
import { ResponsePrideContentDto } from './dto/response.dto';
import { PrideUserService } from './pride-user.service';

@ApiTags('ユーザーの自慢のCRUD処理')
@ApiHeader({
  name: 'google-certification',
  description: '{idToken}',
})
@Controller('api/users/prides')
@UseGuards(GoogleIdTokenVerifyGrantIdGuard)
// @UseGuards(DummyGuardGuard)
export class PrideUserController {
  constructor(private readonly service: PrideUserService) {}

  @ApiResponse({ status: 200, description: 'OK', type: ResponsePrideContentDto })
  @Get('/')
  async getMyPride(@Body() request: RequestUserIDDto): Promise<ResponsePrideContentDto> {
    const pride = await this.service.getMyPrideWithinOnePride(request);
    return { prides: pride };
  }

  @ApiResponse({ status: 201, description: 'Created' })
  @Post()
  async createPride(@Body() request: RequestPrideContentDto) {
    return await this.service.createPride(request);
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @Put('/:uid')
  async updatePride(@Param('uid') uid: string, @Body() request: RequestPrideContentDto) {
    const isExistPride = this.service.isExistPride(uid);
    if (!isExistPride) throw new NoContentException();
    return await this.service.updatePride(uid, request);
  }

  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @Delete('/:uid')
  async deletePride(@Param('uid') uid: string) {
    const isExistPride = this.service.isExistPride(uid);
    if (!isExistPride) throw new NoContentException();
    return await this.service.deletePride(uid);
  }
}
