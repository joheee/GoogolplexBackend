import { Test, TestingModule } from '@nestjs/testing';
import { UserClassMemberService } from './user_class_member.service';

describe('UserClassMemberService', () => {
  let service: UserClassMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserClassMemberService],
    }).compile();

    service = module.get<UserClassMemberService>(UserClassMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
