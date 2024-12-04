import { Module } from '@nestjs/common';
import { UserTodoAnswerService } from './user_todo_answer.service';
import { UserTodoAnswerController } from './user_todo_answer.controller';

@Module({
  controllers: [UserTodoAnswerController],
  providers: [UserTodoAnswerService],
})
export class UserTodoAnswerModule {}
