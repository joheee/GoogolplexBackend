import { Test, TestingModule } from '@nestjs/testing';
import { UserClassMemberController } from './user_class_member.controller';
import { UserClassMemberService } from './user_class_member.service';

describe('UserClassMemberController', () => {
  let controller: UserClassMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserClassMemberController],
      providers: [UserClassMemberService],
    }).compile();

    controller = module.get<UserClassMemberController>(UserClassMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
