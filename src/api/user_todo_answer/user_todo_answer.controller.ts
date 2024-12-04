import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTodoAnswerService } from './user_todo_answer.service';
import { CreateUserTodoAnswerDto } from './dto/create-user_todo_answer.dto';
import { UpdateUserTodoAnswerDto } from './dto/update-user_todo_answer.dto';

@Controller('user-todo-answer')
export class UserTodoAnswerController {
  constructor(private readonly userTodoAnswerService: UserTodoAnswerService) {}

  @Post()
  create(@Body() createUserTodoAnswerDto: CreateUserTodoAnswerDto) {
    return this.userTodoAnswerService.create(createUserTodoAnswerDto);
  }

  @Get()
  findAll() {
    return this.userTodoAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTodoAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTodoAnswerDto: UpdateUserTodoAnswerDto) {
    return this.userTodoAnswerService.update(+id, updateUserTodoAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTodoAnswerService.remove(+id);
  }
}
