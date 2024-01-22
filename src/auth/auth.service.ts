import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { Employee } from 'src/employees/employees.model';
import { EmployeesService } from 'src/employees/employees.service';
import { LoginEmployeeDto } from './dto/login-employee.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(user: User) {
    const payload = { ...user.dataValues, password: undefined };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByPhone(userDto.phone);
    if (user.archive) {
      throw new UnauthorizedException({
        message: 'Пользователь заблокирован',
      });
    }
    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный номер телефона или пароль',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный номер телефона или пароль',
    });
  }

  // MOBILE
  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    return this.generateToken(user);
  }

  // DESKTOP, MOBILE
  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByPhone(
      createUserDto.phone,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким номером телефона уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateTokenEmployee(employee: Employee) {
    const payload = { ...employee.dataValues, password: undefined };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateEmployee(loginEmployeeDto: LoginEmployeeDto) {
    const { login, password } = loginEmployeeDto;

    const employee = await this.employeesService.getEmployeeByLogin(login);
    if (employee && employee.archive) {
      throw new UnauthorizedException({
        message: 'Пользователь заблокирован',
      });
    }
    if (!employee) {
      throw new UnauthorizedException({
        message: 'Некорректный логин или пароль',
      });
    }
    const passwordEquals = await bcrypt.compare(password, employee.password);
    if (employee && passwordEquals) {
      return employee;
    }
    throw new UnauthorizedException({
      message: 'Некорректный логин или пароль',
    });
  }

  // DESKTOP
  async loginEmployee(loginEmployeeDto: LoginEmployeeDto) {
    const employee = await this.validateEmployee(loginEmployeeDto);
    return this.generateTokenEmployee(employee);
  }

  // DESKTOP
  async registrationEmployee(createEmployeeDto: CreateEmployeeDto) {
    const candidate = await this.employeesService.getEmployeeByLogin(
      createEmployeeDto.login,
    );
    if (candidate) {
      throw new HttpException(
        'Сотрудник с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(createEmployeeDto.password, 5);
    const employee = await this.employeesService.createEmployee({
      ...createEmployeeDto,
      password: hashPassword,
    });
    return this.generateTokenEmployee(employee);
  }

  async checkAuthEmployee(login: string) {
    const employee = await this.employeesService.getEmployeeByLogin(login);
    if (employee && employee.archive) {
      throw new UnauthorizedException({
        message: 'Пользователь заблокирован',
      });
    }
    return this.generateTokenEmployee(employee);
  }
}
