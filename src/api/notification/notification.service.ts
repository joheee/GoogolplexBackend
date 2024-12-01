import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async create(createNotificationDto: CreateNotificationDto) {
    return await this.prisma.notification.create({
      data: createNotificationDto,
      include: {
        User: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.notification.findMany({
      include: {
        User: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.notification.findFirst({
      where: { id },
      include: {
        User: true,
      },
    });
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return await this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
      include: {
        User: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.notification.delete({
      where: { id },
      include: {
        User: true,
      },
    });
  }
}
