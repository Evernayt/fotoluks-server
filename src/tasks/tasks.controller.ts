import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Task } from 'src/tasks/tasks.model';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @ApiOperation({ summary: 'Получить задачи' })
  @ApiResponse({ status: 200, type: [Task] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getTasksDto: GetTasksDto) {
    return this.tasksService.getTasks(getTasksDto);
  }

  @ApiOperation({ summary: 'Получить задачу' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.tasksService.getTask(id);
  }

  @ApiOperation({ summary: 'Изменить задачу' })
  @ApiResponse({ status: 200, type: Task })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(updateTaskDto);
  }
}
