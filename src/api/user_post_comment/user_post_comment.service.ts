import { Injectable } from '@nestjs/common';
import { CreateUserPostCommentDto } from './dto/create-user_post_comment.dto';
import { UpdateUserPostCommentDto } from './dto/update-user_post_comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserPostCommentService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserPostCommentDto: CreateUserPostCommentDto) {
    return 'This action adds a new userPostComment';
  }

  findAll() {
    return `This action returns all userPostComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPostComment`;
  }

  update(id: number, updateUserPostCommentDto: UpdateUserPostCommentDto) {
    return `This action updates a #${id} userPostComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPostComment`;
  }
}
