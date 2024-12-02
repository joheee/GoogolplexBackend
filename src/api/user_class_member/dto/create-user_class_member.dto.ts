import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserClassMemberDto {
  @ApiProperty({ example: 'dont be lazy :)', description: 'id of user' })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ example: 'dont be lazy :)', description: 'id of class' })
  @IsNotEmpty()
  @IsString()
  class_id: string;

  @ApiProperty({
    example: false,
    description: 'teacher (true) and student (false)',
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  is_teacher: boolean;
}
