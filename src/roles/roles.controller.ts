import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRolesDto } from './dto/get-roles.dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'Получить роли' })
  @ApiResponse({ status: 200, type: [Role] })
  //@UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() getRolesDto: GetRolesDto) {
    return this.rolesService.getRoles(getRolesDto);
  }
}
