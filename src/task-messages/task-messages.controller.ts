import { GetTaskMessagesDto } from './dto/get-task-messages.dto';
import { CreateTaskMessageDto } from './dto/create-task-message.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TaskMessage } from './task-messages.model';
import { TaskMessagesService } from './task-messages.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTaskMessageDto } from './dto/update-task-message.dto';

@ApiTags('Сообщения задачи')
@Controller('task-messages')
export class TaskMessagesController {
  constructor(private taskMessagesService: TaskMessagesService) {}

  @ApiOperation({ summary: 'Создание сообщения' })
  @ApiResponse({ status: 200, type: TaskMessage })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskMessageDto: CreateTaskMessageDto) {
    return this.taskMessagesService.createTaskMessage(createTaskMessageDto);
  }

  @ApiOperation({ summary: 'Получить сообщения' })
  @ApiResponse({ status: 200, type: [TaskMessage] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getTaskMessagesDto: GetTaskMessagesDto) {
    return this.taskMessagesService.getTaskMessages(getTaskMessagesDto);
  }

  @ApiOperation({ summary: 'Изменить сообщение' })
  @ApiResponse({ status: 200, type: TaskMessage })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateTaskMessageDto: UpdateTaskMessageDto) {
    return this.taskMessagesService.updateTaskMessage(updateTaskMessageDto);
  }
}
