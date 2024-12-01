import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'Johevin Blesstowi', description: 'fullname input' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'student@gmail.com',
    description: 'email input',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'student123',
    description: 'password input',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
