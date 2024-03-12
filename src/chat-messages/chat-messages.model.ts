import { Employee } from 'src/employees/employees.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chat } from 'src/chats/chats.model';

interface ChatMessageCreationAttrs {
  message: string;
  chatId: number;
  employeeId: number;
}

@Table({ tableName: 'chat_messages' })
export class ChatMessage extends Model<ChatMessage, ChatMessageCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID сообщения' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Привет', description: 'Сообщение' })
  @Column({ type: DataType.TEXT, allowNull: false })
  message: string;

  @ApiProperty({ example: 'text', description: 'Тип сообщения' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'text' })
  type: string;

  @ApiProperty({ example: 'false', description: 'Изменено или нет' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  edited: boolean;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER })
  chatId: number;

  @BelongsTo(() => Employee, { foreignKey: 'employeeId' })
  employee: Employee;

  @BelongsTo(() => Chat, { foreignKey: 'chatId' })
  chat: Chat;
}
