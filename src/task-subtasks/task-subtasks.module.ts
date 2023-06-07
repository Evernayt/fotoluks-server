import { Module, forwardRef } from '@nestjs/common';
import { TaskSubtasksController } from './task-subtasks.controller';
import { TaskSubtasksService } from './task-subtasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskSubtask } from './task-subtasks.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TaskSubtasksController],
  providers: [TaskSubtasksService],
  imports: [
    SequelizeModule.forFeature([TaskSubtask]),
    forwardRef(() => AuthModule),
  ],
  exports: [TaskSubtasksService],
})
export class TaskSubtasksModule {}
