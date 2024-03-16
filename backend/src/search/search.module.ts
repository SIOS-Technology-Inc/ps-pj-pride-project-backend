import { Module } from '@nestjs/common';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [UtilitiesModule],
})
export class SearchModule {}
