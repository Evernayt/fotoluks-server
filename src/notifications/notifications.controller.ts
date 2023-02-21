import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { GetNotificationsDto } from './dto/get-notifications.dto';
import { Notification } from './notifications.model';
import { NotificationsService } from './notifications.service';

@ApiTags('Уведомления')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @ApiOperation({ summary: 'Создание уведомления' })
  @ApiResponse({ status: 200, type: Notification })
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @ApiOperation({ summary: 'Получение уведомлений' })
  @ApiResponse({ status: 200, type: [Notification] })
  @Get()
  getAll(@Query() getNotificationsDto: GetNotificationsDto) {
    return this.notificationsService.getNotifications(getNotificationsDto);
  }

  @ApiOperation({ summary: 'Очистить уведомления сотрудника' })
  @ApiResponse({ status: 200 })
  @Delete(':employeeId')
  deleteAllByEmployeeId(@Param('employeeId') employeeId: number) {
    return this.notificationsService.deleteNotificationsByEmployeeId(
      employeeId,
    );
  }
}
