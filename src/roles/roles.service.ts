import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRolesDto } from './dto/get-roles.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.roleModel.create(createRoleDto);
    return role;
  }

  async getRoles(getRolesDto: GetRolesDto) {
    let { limit, page } = getRolesDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    const roles = await this.roleModel.findAndCountAll({
      limit,
      offset,
    });
    return roles;
  }
}
