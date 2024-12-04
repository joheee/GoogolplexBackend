import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTodoAnswerDto {
  @ApiProperty({
    example: 'dont be lazy :)',
    description: 'id of user_assignment_todo',
  })
  @IsNotEmpty()
  @IsString()
  user_assignment_todo_id: string;

  @ApiProperty({ example: 'this is answer', description: 'answer input' })
  @IsNotEmpty()
  @IsString()
  answer: string;
}
