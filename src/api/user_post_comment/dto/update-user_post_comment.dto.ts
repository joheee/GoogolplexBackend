import { PartialType } from '@nestjs/swagger';
import { CreateUserPostCommentDto } from './create-user_post_comment.dto';

export class UpdateUserPostCommentDto extends PartialType(CreateUserPostCommentDto) {}
