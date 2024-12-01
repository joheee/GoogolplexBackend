import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'this is subject', description: 'subject input' })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({ example: 'this is desc', description: 'description input' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
