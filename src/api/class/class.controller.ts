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

@Controller('class')
@ApiTags('class')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @ApiOperation({ summary: 'create class' })
  async create(@Body() createClassDto: CreateClassDto) {
    const newClass = await this.classService.create(createClassDto);
    return new CustomResponse(
      HttpStatus.OK,
      `class with subject ${newClass.subject} is successfully created!`,
      newClass,
    );
  }

  @Get()
  @ApiOperation({ summary: 'get all classes' })
  async findAll() {
    const classes = await this.classService.findAll();
    return new CustomResponse(
      HttpStatus.OK,
      `list of classes retrieved successfully!`,
      classes,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'find class by id' })
  @ApiParam({
    name: 'id',
    description: 'id class',
    type: 'string',
    example: 'dont be lazy :)',
  })
  async findOne(@Param('id') id: string) {
    const findClass = await this.classService.findOne(id);
    if (!findClass) {
      throw new NotFoundException(`class with id ${id} is not found!`);
    }
    return new CustomResponse(
      HttpStatus.OK,
      `found class with title ${findClass.subject}!`,
      findClass,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update class by id' })
  @ApiParam({
    name: 'id',
    description: 'id class',
    type: 'string',
    example: 'dont be lazy :)',
  })
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    const findClass = await this.classService.findOne(id);
    if (!findClass) {
      throw new NotFoundException(`class with id ${id} is not found!`);
    }
    const updateClass = await this.classService.update(id, updateClassDto);
    return new CustomResponse(
      HttpStatus.OK,
      'class is successfully updated!',
      updateClass,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete class by id' })
  @ApiParam({
    name: 'id',
    description: 'id class',
    type: 'string',
    example: 'dont be lazy :)',
  })
  async remove(@Param('id') id: string) {
    const findClass = await this.classService.findOne(id);
    if (!findClass) {
      throw new NotFoundException(`class with id ${id} is not found!`);
    }
    const deleteClass = await this.classService.remove(id);
    return new CustomResponse(
      HttpStatus.OK,
      'class is successfully deleted!',
      deleteClass,
    );
  }
}
