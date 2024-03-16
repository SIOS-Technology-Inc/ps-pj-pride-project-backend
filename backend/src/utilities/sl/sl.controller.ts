import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestCreateDto } from '../dto/request.dto';
import { ResponseIndividualType } from '../dto/response.dto';
import { UtilitiesService } from '../utilities.service';

@ApiTags('FROS/ユーティリティ処理:SL')
@Controller('/api/utilities')
export class SlController {
  constructor(private readonly service: UtilitiesService) {}

  // 所属のリスト
  @Get('sl')
  async getAllDataSL(): Promise<ResponseIndividualType[]> {
    return this.service.getIndividualAllData('sl');
  }
  @Post('sl')
  async createSLData(@Body() request: RequestCreateDto): Promise<void> {
    const isExistData = await this.service.isExistDataByName('sl', request.displayName);
    if (isExistData) throw new ConflictException('Data Already Exist');
    return this.service.createUtilitieData('sl', { displayName: request.displayName });
  }
  @Put('sl/:uid')
  async updateSLData(@Param('uid') uid: string, @Body() request: RequestCreateDto): Promise<void> {
    const isExistData = await this.service.isExistDataByUid('sl', uid);
    if (!isExistData) throw new ConflictException('Data Not Exist');
    return this.service.updateSlData('sl', { uid, displayName: request.displayName });
  }
  @Delete('sl/:uid')
  async deleteSLData(@Param('uid') uid: string): Promise<void> {
    const isExistData = await this.service.isExistDataByUid('sl', uid);
    if (!isExistData) throw new ConflictException('Data Not Exist');
    return this.service.deleteSlData('sl', uid);
  }
}
