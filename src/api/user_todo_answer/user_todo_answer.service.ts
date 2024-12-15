import { Injectable } from '@nestjs/common';
import { CreateUserTodoAnswerDto } from './dto/create-user_todo_answer.dto';
import { UpdateUserTodoAnswerDto } from './dto/update-user_todo_answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserTodoAnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserTodoAnswerDto: CreateUserTodoAnswerDto) {
    return await this.prisma.userTodoAnswer.create({
      data: createUserTodoAnswerDto,
    });
  }

  async findAll() {
    return await this.prisma.userTodoAnswer.findMany({
      include: {
        answer_file: true,
        user_assignment_todo: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.userTodoAnswer.findFirst({
      where: { id },
      include: {
        answer_file: true,
        user_assignment_todo: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findByUserAssignmentTodo(user_assignment_todo_id: string) {
    return await this.prisma.userTodoAnswer.findFirst({
      where: { user_assignment_todo_id },
      include: {
        answer_file: true,
        user_assignment_todo: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findByUserAssignmentTodoId(user_assignment_todo_id: string) {
    return await this.prisma.userTodoAnswer.findFirst({
      where: {
        user_assignment_todo_id,
      },
      include: {
        answer_file: true,
        user_assignment_todo: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findByAssignmentId(assignment_id: string) {
    return await this.prisma.userTodoAnswer.findMany({
      where: {
        user_assignment_todo: {
          assignment_id,
        },
      },
      include: {
        answer_file: true,
        user_assignment_todo: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserTodoAnswerDto: UpdateUserTodoAnswerDto) {
    return await this.prisma.userTodoAnswer.update({
      where: { id },
      data: updateUserTodoAnswerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.userTodoAnswer.delete({
      where: { id },
    });
  }
}
