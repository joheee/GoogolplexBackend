import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  private generateClassCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const randomLetters = Array.from({ length: 4 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length)),
    ).join('');

    const randomNumbers = Array.from({ length: 4 }, () =>
      numbers.charAt(Math.floor(Math.random() * numbers.length)),
    ).join('');

    return randomLetters + randomNumbers;
  }
  private async handleClassCodeCollision(class_code: string): Promise<string> {
    const findByClassCode = await this.findByClassCode(class_code);
    if (findByClassCode) {
      return this.handleClassCodeCollision(this.generateClassCode());
    }
    return class_code;
  }
  private async generateUniqueClassCode(): Promise<string> {
    const initialClassCode = this.generateClassCode();
    return this.handleClassCodeCollision(initialClassCode);
  }

  async findByClassCode(class_code: string) {
    return await this.prisma.class.findFirst({
      where: { class_code },
    });
  }

  async create(createClassDto: CreateClassDto) {
    const class_code = await this.generateUniqueClassCode();
    return await this.prisma.class.create({
      data: { ...createClassDto, class_code: class_code },
    });
  }

  async findAll() {
    return this.prisma.class.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.class.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    return await this.prisma.class.update({
      where: { id },
      data: updateClassDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.class.delete({
      where: { id },
    });
  }
}