import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCodeDto } from './dto/create-code.dto';
import { VerificationDto } from './dto/verification.dto';
import { VerificationService } from './verification.service';

@ApiTags('Верификация')
@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @ApiOperation({ summary: 'Проверка верификации' })
  @ApiResponse({ status: 200 })
  @Get('isVerified/:phone')
  isVerified(@Param('phone') phone: string) {
    return this.verificationService.isVerified(phone);
  }

  @ApiOperation({ summary: 'Создать код' })
  @ApiResponse({ status: 200 })
  @Post('code')
  createCode(@Body() createCodeDto: CreateCodeDto) {
    return this.verificationService.createCode(createCodeDto);
  }

  @ApiOperation({ summary: 'Проверить код' })
  @ApiResponse({ status: 200 })
  @Get('code')
  checkCode(@Query() verificationDto: VerificationDto) {
    return this.verificationService.checkCode(verificationDto);
  }

  @ApiOperation({ summary: 'Верификация номера телефона' })
  @ApiResponse({ status: 200 })
  @Get('verify')
  verifyPhone(@Query() verificationDto: VerificationDto) {
    return this.verificationService.verifyPhone(verificationDto);
  }
}
