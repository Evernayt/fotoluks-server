import { TaskMember } from './../task-members/task-members.model';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from 'src/tasks/tasks.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([Task, TaskMember]),
    forwardRef(() => AuthModule),
  ],
})
export class TasksModule {}
