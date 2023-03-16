import { GetTaskMessagesDto } from './dto/get-task-messages.dto';
import { CreateTaskMessageDto } from './dto/create-task-message.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TaskMessage } from './task-messages.model';
import { TaskMessagesService } from './task-messages.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
