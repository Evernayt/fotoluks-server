import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { LoginEmployeeDto } from 'src/employees/dto/login-employee.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @Post('login/employee')
  loginEmployee(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.authService.loginEmployee(loginEmployeeDto);
  }

  @Post('registration/employee')
  registrationEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.authService.registrationEmployee(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check/employee/:login')
  checkAuthEmployee(@Param('login') login: string) {
    return this.authService.checkAuthEmployee(login);
  }
}
