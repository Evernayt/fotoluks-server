import { AuthModule } from 'src/auth/auth.module';
import { TaskMessage } from './task-messages.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskMessagesService } from './task-messages.service';
import { TaskMessagesController } from './task-messages.controller';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  controllers: [TaskMessagesController],
  providers: [TaskMessagesService],
  imports: [
    SequelizeModule.forFeature([TaskMessage]),
    forwardRef(() => AuthModule),
  ],
})
export class TaskMessagesModule {}
