import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentFileDto {
  @ApiProperty({ example: 'dont be lazy :)', description: 'id of assignment' })
  @IsNotEmpty()
  @IsString()
  assignment_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'assignment file input',
    required: false,
  })
  @Transform(({ value }) => (value === '' ? null : value))
  assignment_file_upload?: string;
}
