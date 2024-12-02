import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'this is title', description: 'title input' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'this is content',
    description: 'content input',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
