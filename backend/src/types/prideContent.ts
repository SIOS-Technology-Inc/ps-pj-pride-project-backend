import { ApiProperty } from '@nestjs/swagger';

export class PrideContent {
  @ApiProperty({ example: 'uid', description: 'Unique ID' })
  uid: string;

  @ApiProperty({ example: 'userID', description: 'User ID' })
  userID: string;

  @ApiProperty({ example: 'userName', description: 'User Name' })
  userName: string;

  @ApiProperty({ example: 'userPhotoURL', description: 'User Photo URL' })
  userPhotoURL: string;

  @ApiProperty({ example: 'title', description: 'Title' })
  title: string;

  @ApiProperty({ example: 'memo', description: 'Memo' })
  memo: string;

  @ApiProperty({ example: ['thumbsupUsers'], description: 'Thumbsup Users' })
  thumbsupUsers: string[];

  @ApiProperty({ example: 0, description: 'Thumbsup Count' })
  thumbsupCount: number;

  @ApiProperty({ example: 'createdAt', description: 'Created At' })
  createdAt?: Date;
}
