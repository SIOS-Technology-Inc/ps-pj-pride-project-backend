import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleIdTokenVerifyGrantIdGuard } from 'src/common/guard/google-id-token-verify-grant-id/google-id-token-verify-grant-id.guard';
import { UtilityFilter } from './dto/request.dto';
import { ResponseUserManagerDto, ResponseUserQualificationDto, ResponseUserSkillDto } from './dto/response.dto';
import { SearchService } from './search.service';

@ApiTags('FROS/検索処理')
@Controller('/api/search')
@UseGuards(GoogleIdTokenVerifyGrantIdGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get('/')
  async search(@Query(new ValidationPipe({ transform: true })) filter: UtilityFilter): Promise<ResponseUserSkillDto> {
    console.log(filter);

    if (!filter.ids) return this.searchService.getAllUsersSkills();
    return this.searchService.getUsersQuerySkills(filter.ids);
  }

  @Get('/managers')
  async searchManagers(
    @Query(new ValidationPipe({ transform: true })) filter: UtilityFilter,
  ): Promise<ResponseUserManagerDto> {
    if (!filter.ids) return this.searchService.getAllUsersManagers();
    return this.searchService.getUsersQueryManagers(filter.ids);
  }

  @Get('/qualifications')
  async searchQualifications(
    @Query(new ValidationPipe({ transform: true })) filter: UtilityFilter,
  ): Promise<ResponseUserQualificationDto> {
    if (!filter.ids) return this.searchService.getAllUsersQuanlification();
    return this.searchService.getUsersQueryQualification(filter.ids);
  }
}
