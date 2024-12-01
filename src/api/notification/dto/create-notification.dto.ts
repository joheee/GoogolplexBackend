import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ example: 'dont be lazy :)', description: 'id of user' })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ example: 'this is title', description: 'title input' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'this is description',
    description: 'description input',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: false, description: 'read status' })
  @IsNotEmpty()
  @IsString()
  is_read: string;
}
