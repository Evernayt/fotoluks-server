import { GetTaskMessagesDto } from './dto/get-task-messages.dto';
import { CreateTaskMessageDto } from './dto/create-task-message.dto';
import { TaskMessage } from './task-messages.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';

@Injectable()
export class TaskMessagesService {
  constructor(
    @InjectModel(TaskMessage) private taskMessageModel: typeof TaskMessage,
    private sequelize: Sequelize,
  ) {}

  // DESKTOP
  async createTaskMessage(createTaskMessageDto: CreateTaskMessageDto) {
    const taskMessage = await this.taskMessageModel.create(
      createTaskMessageDto,
    );
    return taskMessage;
  }

  // DESKTOP
  async getTaskMessages(getTaskMessagesDto: GetTaskMessagesDto) {
    let { limit, page, taskId } = getTaskMessagesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    let where: any;
    if (taskId) {
      where = { taskId };
    }

    const taskMessages = await this.taskMessageModel.findAndCountAll({
      limit,
      offset,
      where,
      include: [
        {
          model: Employee,
        },
      ],
    });
    return taskMessages;
  }
}
