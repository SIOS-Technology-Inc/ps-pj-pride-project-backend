import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class RequestPrideContentDto {
  userID: string;
  userName: string;
  userPhoto: string;

  @ApiProperty({
    description: 'Title',
    example: 'I will not drink for a month',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'Memo',
    example: 'I will not drink for a month',
    type: String,
  })
  memo: string;
}

export class RequestUserIDDto {
  @ApiHideProperty()
  userID: string;
}
