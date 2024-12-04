import { Injectable } from '@nestjs/common';
import { CreateUserTodoAnswerDto } from './dto/create-user_todo_answer.dto';
import { UpdateUserTodoAnswerDto } from './dto/update-user_todo_answer.dto';

@Injectable()
export class UserTodoAnswerService {
  create(createUserTodoAnswerDto: CreateUserTodoAnswerDto) {
    return 'This action adds a new userTodoAnswer';
  }

  findAll() {
    return `This action returns all userTodoAnswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTodoAnswer`;
  }

  update(id: number, updateUserTodoAnswerDto: UpdateUserTodoAnswerDto) {
    return `This action updates a #${id} userTodoAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTodoAnswer`;
  }
}
