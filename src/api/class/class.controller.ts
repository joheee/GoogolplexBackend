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
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { CustomResponse } from 'src/tools/CustomResponse';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

const TABLE_NAME = 'class';

@ApiTags(TABLE_NAME)
@Controller(TABLE_NAME)
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  async create(@Body() createClassDto: CreateClassDto) {
    const newClass = await this.classService.create(createClassDto);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} with subject ${newClass.subject} is successfully created!`,
      newClass,
    );
  }

  @Get()
  @ApiOperation({ summary: `get all ${TABLE_NAME}` })
  async findAll() {
    const classes = await this.classService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of ${TABLE_NAME} retrieved successfully!`,
      classes,
    );
  }

  @Get('user/:user_id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by user_id` })
  @ApiParam({
    name: 'user_id',
    description: `user_id ${TABLE_NAME}`,
    type: 'string',
    example: 'dont be lazy :)',
  })
  async findByUserId(@Param('user_id') id: string) {
    const findClass = await this.classService.findByUserId(id);
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} for user_id ${id}!`,
      findClass,
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
    const findClass = await this.classService.findOne(id);
    if (!findClass) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found ${TABLE_NAME} with title ${findClass.subject}!`,
      findClass,
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
    @Body() updateClassDto: UpdateClassDto,
  ) {
    const findClass = await this.classService.findOne(id);
    if (!findClass) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    const updateClass = await this.classService.update(id, updateClassDto);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully updated!`,
      updateClass,
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
    const findClass = await this.classService.findOne(id);
    if (!findClass) {
      throw new NotFoundException(`${TABLE_NAME} with id ${id} is not found!`);
    }
    const deleteClass = await this.classService.remove(id);
    return new CustomResponse(
      HttpStatus.OK,
      `${TABLE_NAME} is successfully deleted!`,
      deleteClass,
    );
  }
}
