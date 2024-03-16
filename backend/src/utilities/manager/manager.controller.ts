import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestCreateDto } from '../dto/request.dto';
import { ResponseIndividualType } from '../dto/response.dto';
import { UtilitiesService } from '../utilities.service';

@ApiTags('FROS/ユーティリティ処理:manager')
@Controller('/api/utilities')
export class ManagerController {
  constructor(private readonly service: UtilitiesService) {}

  //管理している対象のリスト
  @Get('manager')
  async getAllDataManager(): Promise<ResponseIndividualType[]> {
    return this.service.getIndividualAllData('manager');
  }
  @Post('manager')
  async createManagerData(@Body() request: RequestCreateDto): Promise<void> {
    const isExistData = await this.service.isExistDataByName('manager', request.displayName);
    if (isExistData) throw new ConflictException('Data Already Exist');
    return this.service.createUtilitieData('manager', { displayName: request.displayName });
  }
  @Put('manager/:uid')
  async updateManagerData(@Param('uid') uid: string, @Body() request: RequestCreateDto): Promise<void> {
    const isExistData = await this.service.isExistDataByUid('manager', uid);
    if (!isExistData) throw new ConflictException('Data Not Exist');
    return this.service.updateSlData('manager', { uid, displayName: request.displayName });
  }
  @Delete('manager/:uid')
  async deleteManagerData(@Param('uid') uid: string): Promise<void> {
    const isExistData = await this.service.isExistDataByUid('manager', uid);
    if (!isExistData) throw new ConflictException('Data Not Exist');
    return this.service.deleteSlData('manager', uid);
  }
}
