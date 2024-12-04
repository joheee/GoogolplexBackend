import { PartialType } from '@nestjs/swagger';
import { CreateUserAssignmentTodoDto } from './create-user_assignment_todo.dto';

export class UpdateUserAssignmentTodoDto extends PartialType(CreateUserAssignmentTodoDto) {}
