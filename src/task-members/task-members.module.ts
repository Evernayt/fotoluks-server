import { TaskMember } from './task-members.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([TaskMember])],
})
export class TaskMembersModule {}
