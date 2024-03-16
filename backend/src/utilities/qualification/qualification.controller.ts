import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestCreateDto } from '../dto/request.dto';
import { ResponseIndividualType } from '../dto/response.dto';
import { UtilitiesService } from '../utilities.service';

@ApiTags('FROS/ユーティリティ処理:qualification')
@Controller('/api/utilities')
export class QualificationController {
  constructor(private readonly service: UtilitiesService) {}

  // 資格のリスト
  @Get('qualification')
  async getAllDataQuantification(): Promise<ResponseIndividualType[]> {
    return this.service.getIndividualAllData('qualification');
  }
  @Post('qualification')
  async createQualificationData(@Body() request: RequestCreateDto): Promise<void> {
    const isExistData = await this.service.isExistDataByName('qualification', request.displayName);
    if (isExistData) throw new ConflictException('Data Already Exist');
    return this.service.createUtilitieData('qualification', { displayName: request.displayName });
  }
  @Put('qualification/:uid')
  async updateQualificationData(@Param('uid') uid: string, @Body() request: RequestCreateDto): Promise<void> {
    const isExistData = await this.service.isExistDataByUid('qualification', uid);
    if (!isExistData) throw new ConflictException('Data Not Exist');
    return this.service.updateSlData('qualification', { uid, displayName: request.displayName });
  }
  @Delete('qualification/:uid')
  async deleteQualificationData(@Param('uid') uid: string): Promise<void> {
    const isExistData = await this.service.isExistDataByUid('qualification', uid);
    if (!isExistData) throw new ConflictException('Data Not Exist');
    return this.service.deleteSlData('qualification', uid);
  }
}
