import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskSubtasksService } from './task-subtasks.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TaskSubtask } from './task-subtasks.model';
import { UpdateTaskSubtaskDto } from './dto/update-task-subtask.dto';

@ApiTags('Подзадачи задачи')
@Controller('task-subtasks')
export class TaskSubtasksController {
  constructor(private taskSubtasksService: TaskSubtasksService) {}
  @ApiOperation({ summary: 'Изменить подзадачу' })
  @ApiResponse({ status: 200, type: TaskSubtask })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateTaskSubtaskDto: UpdateTaskSubtaskDto) {
    return this.taskSubtasksService.updateTaskSubtask(updateTaskSubtaskDto);
  }
}
