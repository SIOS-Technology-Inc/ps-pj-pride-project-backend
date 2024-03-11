import { ApiProperty } from '@nestjs/swagger';
import { PrideContent } from 'src/types/prideContent';

export class ResponsePrideContentDto {
  @ApiProperty({
    type: [PrideContent],
    description: 'prides',
  })
  prides: PrideContent[];
}
