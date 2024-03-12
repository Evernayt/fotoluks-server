import { ChatMember } from './chat-members.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([ChatMember])],
})
export class ChatMembersModule {}
