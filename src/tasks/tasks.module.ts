import { TaskMember } from './../task-members/task-members.model';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from 'src/tasks/tasks.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Module, forwardRef } from '@nestjs/common';
import { TaskSubtask } from 'src/task-subtasks/task-subtasks.model';
import { TaskSubtasksModule } from 'src/task-subtasks/task-subtasks.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([Task, TaskMember, TaskSubtask]),
    forwardRef(() => AuthModule),
    forwardRef(() => TaskSubtasksModule),
  ],
})
export class TasksModule {}
