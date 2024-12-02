import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CustomResponse } from 'src/tools/CustomResponse';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

const TABLE_NAME = 'notification';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  @ApiBody({
    type: CreateNotificationDto,
  })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const user = await this.authService.findById(createNotificationDto.user_id);
    if (!user) {
      throw new NotFoundException(
        `user with id ${createNotificationDto.user_id} is not found!`,
      );
    }
    const newNotif = await this.notificationService.create(
      createNotificationDto,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} successfully created!`,
      newNotif,
    );
  }

  @Get()
  @ApiOperation({ summary: `get all ${TABLE_NAME}` })
  async findAll() {
    const notifications = await this.notificationService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of ${TABLE_NAME} retrieved successfully!`,
      notifications,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    description: `id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async findOne(@Param('id') id: string) {
    const findNotif = await this.notificationService.findOne(id);
    if (!findNotif) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with title ${findNotif.title}!`,
      findNotif,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: `update ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    description: `id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    const findNotif = await this.notificationService.findOne(id);
    if (!findNotif) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }

    if (updateNotificationDto.user_id) {
      const findUser = await this.authService.findById(
        updateNotificationDto.user_id,
      );
      if (!findUser) {
        throw new NotFoundException(
          `user with id ${updateNotificationDto.user_id} is not found!`,
        );
      }
    }

    const updateNotif = await this.notificationService.update(
      id,
      updateNotificationDto,
    );
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully updated!`,
      updateNotif,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: `delete ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    description: `id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async remove(@Param('id') id: string) {
    const findNotif = await this.notificationService.findOne(id);
    if (!findNotif) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    const deleteNotif = await this.notificationService.remove(id);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deleteNotif,
    );
  }
}
