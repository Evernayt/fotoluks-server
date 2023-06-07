import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskSubtask } from './task-subtasks.model';
import { UpdateTaskSubtaskDto } from './dto/update-task-subtask.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class TaskSubtasksService {
  constructor(
    @InjectModel(TaskSubtask) private taskSubtaskModel: typeof TaskSubtask,
  ) {}

  async updateTaskSubtask(
    updateTaskSubtaskDto: UpdateTaskSubtaskDto,
    transaction?: Transaction,
  ) {
    const { id } = updateTaskSubtaskDto;

    const taskSubtask = await this.taskSubtaskModel.update(
      updateTaskSubtaskDto,
      { where: { id }, transaction },
    );
    return taskSubtask;
  }
}
