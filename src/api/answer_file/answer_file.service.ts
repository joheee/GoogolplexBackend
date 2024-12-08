import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlinkSync } from 'fs';

@Injectable()
export class AnswerFileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    user_todo_answer_id: string,
    answer_file_upload: Express.Multer.File,
  ) {
    console.log(user_todo_answer_id);
    return await this.prisma.answerFile.create({
      data: {
        user_todo_answer_id,
        ...answer_file_upload,
      },
    });
  }

  async findAll() {
    return await this.prisma.answerFile.findMany({
      include: {
        user_todo_answer: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.answerFile.findFirst({
      where: { id },
      include: {
        user_todo_answer: true,
      },
    });
  }

  async findByUserTodoAnswerId(user_todo_answer_id: string) {
    return await this.prisma.answerFile.findFirst({
      where: {
        user_todo_answer_id,
      },
    });
  }

  async removeInPublic(filePath: string) {
    unlinkSync(filePath);
    return true;
  }

  async removeInDb(id: string) {
    return await this.prisma.answerFile.delete({
      where: { id },
    });
  }
}
