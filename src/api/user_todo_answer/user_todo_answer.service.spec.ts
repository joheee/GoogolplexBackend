import { Test, TestingModule } from '@nestjs/testing';
import { UserTodoAnswerService } from './user_todo_answer.service';

describe('UserTodoAnswerService', () => {
  let service: UserTodoAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTodoAnswerService],
    }).compile();

    service = module.get<UserTodoAnswerService>(UserTodoAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
