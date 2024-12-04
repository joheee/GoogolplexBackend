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
    });
  }

  async findAll() {
    return await this.prisma.userAssignmentTodo.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.userAssignmentTodo.findFirst({
      where: { id },
    });
  }

  async update(
    id: string,
    updateUserAssignmentTodoDto: UpdateUserAssignmentTodoDto,
  ) {
    return await this.prisma.userAssignmentTodo.update({
      where: { id },
      data: updateUserAssignmentTodoDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.userAssignmentTodo.delete({
      where: { id },
    });
  }
}
