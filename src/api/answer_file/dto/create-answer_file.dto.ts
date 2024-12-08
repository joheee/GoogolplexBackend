import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnswerFileDto {
  @ApiProperty({
    example: 'dont be lazy :)',
    description: 'id of user_todo_answer',
  })
  @IsNotEmpty()
  @IsString()
  user_todo_answer_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'answer file input',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  answer_file_upload?: string;
}
