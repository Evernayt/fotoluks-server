import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
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
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @ApiOperation({ summary: 'Получение уведомлений' })
  @ApiResponse({ status: 200, type: [Notification] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getNotificationsDto: GetNotificationsDto) {
    return this.notificationsService.getNotifications(getNotificationsDto);
  }

  @ApiOperation({ summary: 'Очистить уведомления сотрудника' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(':employeeId')
  deleteAllByEmployeeId(@Param('employeeId') employeeId: number) {
    return this.notificationsService.deleteNotificationsByEmployeeId(
      employeeId,
    );
  }
}
