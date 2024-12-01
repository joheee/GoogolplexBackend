import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  async findAll() {
    return await this.prisma.notification.findMany({
      include: {
        User: true,
      },
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  async remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
