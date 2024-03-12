import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ChatMember } from 'src/chat-members/chat-members.model';
import { ChatMessage } from 'src/chat-messages/chat-messages.model';
import { ChatReadMessage } from 'src/chat-read-messages/chat-read-messages.model';
import { Employee } from 'src/employees/employees.model';

interface ChatCreationAttrs {
  name: string;
  image: string;
  creatorId: number;
}

@Table({ tableName: 'chats' })
export class Chat extends Model<Chat, ChatCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID чата' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Чат 1', description: 'Название чата' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'https://google.com', description: 'Изображение' })
  @Column({ type: DataType.STRING, defaultValue: null })
  image: string;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  creatorId: number;

  @BelongsTo(() => Employee, { foreignKey: 'creatorId' })
  creator: Employee;

  @HasMany(() => ChatMember, { foreignKey: 'chatId' })
  chatMembers: ChatMember[];

  @HasMany(() => ChatMessage, { foreignKey: 'chatId' })
  chatMessages: ChatMessage[];

  @HasMany(() => ChatReadMessage, { foreignKey: 'chatId' })
  chatReadMessages: ChatReadMessage[];
}
