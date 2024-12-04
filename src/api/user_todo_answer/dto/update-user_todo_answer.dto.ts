import { PartialType } from '@nestjs/swagger';
import { CreateUserTodoAnswerDto } from './create-user_todo_answer.dto';

export class UpdateUserTodoAnswerDto extends PartialType(CreateUserTodoAnswerDto) {}
