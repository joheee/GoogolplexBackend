import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssignmentDto {
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

  @ApiProperty({
    example: '2024-12-31T23:59:59.999Z',
    description: 'Due date in ISO 8601 format',
  })
  @IsNotEmpty()
  @IsString()
  due_date: Date;
}
