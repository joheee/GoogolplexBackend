import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserAssignmentTodoDto {
  @ApiProperty({ example: 0, description: 'score input' })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty({
    example: false,
    description: 'finish (true) and not finish (false)',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  is_finish?: boolean;

  @ApiProperty({ example: 'dont be lazy :)', description: 'id of user' })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ example: 'dont be lazy :)', description: 'id of assignment' })
  @IsNotEmpty()
  @IsString()
  assignment_id: string;
}
