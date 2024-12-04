import { Test, TestingModule } from '@nestjs/testing';
import { UserTodoAnswerController } from './user_todo_answer.controller';
import { UserTodoAnswerService } from './user_todo_answer.service';

describe('UserTodoAnswerController', () => {
  let controller: UserTodoAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTodoAnswerController],
      providers: [UserTodoAnswerService],
    }).compile();

    controller = module.get<UserTodoAnswerController>(UserTodoAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
