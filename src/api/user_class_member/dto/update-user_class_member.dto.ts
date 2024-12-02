import { PartialType } from '@nestjs/swagger';
import { CreateUserClassMemberDto } from './create-user_class_member.dto';

export class UpdateUserClassMemberDto extends PartialType(CreateUserClassMemberDto) {}
