import { ApiProperty } from '@nestjs/swagger';

export class RequestThumbsUpPrideDto {
  @ApiProperty({
    description: 'ユーザーID',
    example: 'ohi71HBm4IRSdMFVH3mj9DkYFSg1',
    type: String,
  })
  userID: string;

  @ApiProperty({
    description: '画像URL',
    example: 'https://sample.com/sample.jpg',
    type: String,
  })
  userPhoto: string;
}
