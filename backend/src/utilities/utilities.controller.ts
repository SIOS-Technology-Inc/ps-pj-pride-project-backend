import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseAllType } from './dto/response.dto';
import { UtilitiesService } from './utilities.service';

@ApiTags('FROS/ユーティリティ処理')
@Controller('/api/utilities')
export class UtilitiesController {
  constructor(private readonly service: UtilitiesService) {}

  // 全てのリスト
  @Get()
  async getAllData(): Promise<ResponseAllType> {
    return this.service.getAllData();
  }
}
