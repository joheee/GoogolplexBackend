import { Injectable } from '@nestjs/common';
import { CreateUserAssignmentTodoDto } from './dto/create-user_assignment_todo.dto';
import { UpdateUserAssignmentTodoDto } from './dto/update-user_assignment_todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAssignmentTodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserAssignmentTodoDto: CreateUserAssignmentTodoDto) {
    return await this.prisma.userAssignmentTodo.create({
      data: createUserAssignmentTodoDto,
      include: {
        user_todo_answer: {
          include: {
            answer_file: true,
          },
        },
        assignment: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.userAssignmentTodo.findMany({
      include: {
        user_todo_answer: {
          include: {
            answer_file: true,
          },
        },
        assignment: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }

  async findManyByUserId(user_id: string) {
    return await this.prisma.userAssignmentTodo.findMany({
      where: {
        user_id,
      },
      include: {
        user_todo_answer: {
          include: {
            answer_file: true,
          },
        },
        assignment: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }

  async findManyByUserIdAndAssignmentId(
    user_id: string,
    assignment_id: string,
  ) {
    return await this.prisma.userAssignmentTodo.findMany({
      where: {
        user_id,
        assignment_id,
      },
      include: {
        user_todo_answer: {
          include: {
            answer_file: true,
          },
        },
        assignment: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.userAssignmentTodo.findFirst({
      where: { id },
      include: {
        user_todo_answer: {
          include: {
            answer_file: true,
          },
        },
        assignment: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    updateUserAssignmentTodoDto: UpdateUserAssignmentTodoDto,
  ) {
    return await this.prisma.userAssignmentTodo.update({
      where: { id },
      data: updateUserAssignmentTodoDto,
      include: {
        user_todo_answer: {
          include: {
            answer_file: true,
          },
        },
        assignment: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.userAssignmentTodo.delete({
      where: { id },
      include: {
        user_todo_answer: {
          include: {
            answer_file: true,
          },
        },
        assignment: true,
        user: {
          include: {
            user_class_member: true,
          },
        },
      },
    });
  }
}
