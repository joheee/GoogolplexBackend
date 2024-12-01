import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'user picture input (URL)',
    type: String,
    example:
      'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-256x256-q0fen40c.png',
  })
  picture: string;
}
