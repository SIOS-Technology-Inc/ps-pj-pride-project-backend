import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestCreateDto } from '../dto/request.dto';
import { ResponseIndividualType } from '../dto/response.dto';
import { UtilitiesService } from '../utilities.service';

@ApiTags('FROS/ユーティリティ処理:skill')
@Controller('/api/utilities')
export class SkillController {
  constructor(private readonly service: UtilitiesService) {}

  //スキルのリスト
  @Get('skill')
  async getAllDataSkill(): Promise<ResponseIndividualType[]> {
    return this.service.getIndividualAllData('skill');
  }
  @Post('skill')
  async createSkillData(@Body() request: RequestCreateDto): Promise<void> {
    const isExistData = await this.service.isExistDataByName('skill', request.displayName);
    if (isExistData) throw new ConflictException('Data Already Exist');
    return this.service.createUtilitieData('skill', { displayName: request.displayName });
  }
  @Put('skill/:uid')
  async updateSkillData(@Param('uid') uid: string, @Body() request: RequestCreateDto): Promise<void> {
    const isExistData = await this.service.isExistDataByUid('skill', uid);
    if (!isExistData) throw new ConflictException('Data Not Exist');
    return this.service.updateSlData('skill', { uid, displayName: request.displayName });
  }
  @Delete('skill/:uid')
  async deleteSkillData(@Param('uid') uid: string): Promise<void> {
    const isExistData = await this.service.isExistDataByUid('skill', uid);
    if (!isExistData) throw new ConflictException('Data Not Exist');
    return this.service.deleteSlData('skill', uid);
  }
}
