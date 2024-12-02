import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'dont be lazy :)', description: 'id of article' })
  @IsNotEmpty()
  @IsString()
  article_id: string;

  @ApiProperty({ example: 'dont be lazy :)', description: 'id of assignment' })
  @IsOptional()
  @IsString()
  assignment_id?: string;

  @ApiProperty({ example: 'dont be lazy :)', description: 'id of class' })
  @IsNotEmpty()
  @IsString()
  class_id?: string;
}
