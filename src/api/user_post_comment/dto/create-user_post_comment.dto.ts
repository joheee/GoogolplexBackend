import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserPostCommentDto {
  @ApiProperty({ example: 'dont be lazy :)', description: 'id of user' })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ example: 'dont be lazy :)', description: 'id of post' })
  @IsNotEmpty()
  @IsString()
  post_id: string;

  @ApiProperty({ example: 'this is comment', description: 'comment input' })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
