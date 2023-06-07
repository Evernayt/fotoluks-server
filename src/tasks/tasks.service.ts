import { Employee } from 'src/employees/employees.model';
import { TaskMember } from './../task-members/task-members.model';
import { TaskMessage } from './../task-messages/task-messages.model';
import { Department } from 'src/departments/departments.model';
import { Shop } from 'src/shops/shops.model';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from 'src/tasks/tasks.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { Op } from 'sequelize';
import { CreateTaskSubtaskDto } from 'src/task-subtasks/dto/create-task-subtask.dto';
import { TaskSubtasksService } from 'src/task-subtasks/task-subtasks.service';
import { TaskSubtask } from 'src/task-subtasks/task-subtasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskModel: typeof Task,
    @InjectModel(TaskMember) private taskMemberModel: typeof TaskMember,
    @InjectModel(TaskSubtask) private taskSubtaskModel: typeof TaskSubtask,
    private taskSubtasksService: TaskSubtasksService,
    private sequelize: Sequelize,
  ) {}

  // DESKTOP
  async createTask(createTaskDto: CreateTaskDto) {
    const { taskMembersForCreate, taskSubtasksForCreate } = createTaskDto;

    const t = await this.sequelize.transaction();
    let task: Task;

    try {
      task = await this.taskModel.create(
        { ...createTaskDto, completedDate: null },
        {
          transaction: t,
        },
      );

      // CREATE TASK MEMBERS
      if (taskMembersForCreate?.length) {
        const taskMembers = [];
        taskMembersForCreate.forEach((employeeId, index) => {
          taskMembers[index] = {
            taskId: task.id,
            employeeId,
          };
        });

        await this.taskMemberModel.bulkCreate(taskMembers, {
          transaction: t,
          ignoreDuplicates: true,
        });
      }

      // CREATE TASK SUBTASKS
      if (taskSubtasksForCreate?.length) {
        const taskSubtasks: CreateTaskSubtaskDto[] = [];
        taskSubtasksForCreate.forEach((taskSubtask, index) => {
          taskSubtasks[index] = {
            taskId: task.id,
            text: taskSubtask.text,
          };
        });

        await this.taskSubtaskModel.bulkCreate(taskSubtasks, {
          transaction: t,
          ignoreDuplicates: true,
        });
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
    }
    return task;
  }

  // DESKTOP
  async getTasks(getTasksDto: GetTasksDto) {
    let {
      limit,
      page,
      archive,
      status,
      employeeId,
      creatorId,
      shopIds,
      departmentIds,
      search,
      startDate,
      endDate,
      urgent,
    } = getTasksDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';
    urgent = String(urgent) === 'true';

    let where: any = { archive };
    let whereEmployee: any;

    if (creatorId) {
      where = { ...where, creatorId };
    }

    if (status) {
      switch (String(status)) {
        case '1':
          where = { ...where, completed: false };
          break;
        case '2':
          where = { ...where, completed: true };
          break;
        default:
          break;
      }
    }

    if (shopIds) {
      shopIds = shopIds.map(Number);
      if (!shopIds.includes(0)) {
        where = { ...where, shopId: shopIds };
      }
    }

    if (departmentIds) {
      departmentIds = departmentIds.map(Number);
      if (!departmentIds.includes(0)) {
        where = { ...where, departmentId: departmentIds };
      }
    }

    if (employeeId) {
      whereEmployee = { id: employeeId };
    }

    if (startDate || endDate) {
      if (!endDate) {
        endDate = '9999-12-01T00:00';
      }
      where = {
        ...where,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      };
    }

    if (urgent) {
      where = { ...where, urgent };
    }

    if (search) {
      const words = search.match(/[^ ]+/g);
      if (words) {
        const or = [];
        words.forEach((word) => {
          or.push({ [Op.like]: `%${word}%` });
        });

        where = {
          [Op.or]: [
            {
              id: {
                [Op.or]: or,
              },
            },
            {
              title: {
                [Op.or]: or,
              },
            },
            {
              description: {
                [Op.or]: or,
              },
            },
          ],
        };
      }
    }

    const tasks = await this.taskModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['id', 'DESC']],
      where,
      include: [
        {
          model: Shop,
        },
        {
          model: Department,
        },
        {
          model: TaskMessage,
          attributes: ['id'],
        },
        {
          model: TaskMember,
          include: [
            {
              model: Employee,
              where: whereEmployee,
              attributes: {
                exclude: ['password'],
              },
            },
          ],
        },
      ],
    });
    return tasks;
  }

  // DESKTOP
  async getTask(id: number, transaction?: Transaction) {
    const task = await this.taskModel.findOne({
      where: { id: id },
      transaction,
      include: [
        {
          model: Shop,
        },
        {
          model: Department,
        },
        {
          model: TaskMember,
          include: [
            {
              model: Employee,
            },
          ],
        },
        {
          model: Employee,
          as: 'creator',
        },
        {
          model: Employee,
          as: 'executor',
        },
        {
          model: TaskSubtask,
        },
      ],
    });
    return task;
  }

  // DESKTOP
  async updateTask(updateTaskDto: UpdateTaskDto) {
    const {
      id,
      taskMembersForCreate,
      taskMembersForDelete,
      taskSubtasksForCreate,
      taskSubtasksForUpdate,
      taskSubtasksForDelete,
    } = updateTaskDto;

    const t = await this.sequelize.transaction();
    let task: Task;

    try {
      await this.taskModel.update(updateTaskDto, {
        where: { id },
        transaction: t,
      });

      // CREATE TASK MEMBERS
      if (taskMembersForCreate?.length) {
        const taskMembers = [];
        taskMembersForCreate.forEach((employeeId, index) => {
          taskMembers[index] = {
            taskId: id,
            employeeId,
          };
        });

        await this.taskMemberModel.bulkCreate(taskMembers, {
          transaction: t,
          ignoreDuplicates: true,
        });
      }

      // DELETE TASK MEMBERS
      if (taskMembersForDelete?.length) {
        const whereTaskMember: any = {
          employeeId: taskMembersForDelete,
          taskId: id,
        };
        await this.taskMemberModel.destroy({
          where: whereTaskMember,
          transaction: t,
        });
      }

      // CREATE TASK SUBTASKS
      if (taskSubtasksForCreate?.length) {
        const taskSubtasks: CreateTaskSubtaskDto[] = [];
        taskSubtasksForCreate.forEach((taskSubtask, index) => {
          taskSubtasks[index] = {
            taskId: id,
            text: taskSubtask.text,
          };
        });

        await this.taskSubtaskModel.bulkCreate(taskSubtasks, {
          transaction: t,
          ignoreDuplicates: true,
        });
      }

      // UPDATE TASK SUBTASKS
      if (taskSubtasksForUpdate?.length) {
        for (let i = 0; i < taskSubtasksForUpdate.length; i++) {
          const taskSubtask = taskSubtasksForUpdate[i];
          await this.taskSubtasksService.updateTaskSubtask(taskSubtask, t);
        }
      }

      // DELETE TASK SUBTASKS
      if (taskSubtasksForDelete?.length) {
        await this.taskSubtaskModel.destroy({
          where: { id: taskSubtasksForDelete },
          transaction: t,
        });
      }

      task = await this.getTask(id, t);

      await t.commit();
    } catch (error) {
      await t.rollback();
    }

    return task;
  }
}
