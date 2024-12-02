import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPostCommentService } from './user_post_comment.service';
import { CreateUserPostCommentDto } from './dto/create-user_post_comment.dto';
import { UpdateUserPostCommentDto } from './dto/update-user_post_comment.dto';

@Controller('user-post-comment')
export class UserPostCommentController {
  constructor(private readonly userPostCommentService: UserPostCommentService) {}

  @Post()
  create(@Body() createUserPostCommentDto: CreateUserPostCommentDto) {
    return this.userPostCommentService.create(createUserPostCommentDto);
  }

  @Get()
  findAll() {
    return this.userPostCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPostCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPostCommentDto: UpdateUserPostCommentDto) {
    return this.userPostCommentService.update(+id, updateUserPostCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPostCommentService.remove(+id);
  }
}
