import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  // DESKTOP
  async getUsers(getUsersDto: GetUsersDto) {
    let { limit, page, archive, search } = getUsersDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;
    archive = String(archive) === 'true';

    let where: any = { archive };

    if (search) {
      const words = search.match(/[^ ]+/g);
      const or = [];

      for (let index = 0; index < words.length; index++) {
        or.push({ [Op.like]: '%' + words[index] + '%' });
      }

      where = {
        ...where,
        [Op.or]: [
          {
            name: {
              [Op.or]: or,
            },
          },
          {
            phone: {
              [Op.or]: or,
            },
          },
          {
            email: {
              [Op.or]: or,
            },
          },
          {
            vk: {
              [Op.or]: or,
            },
          },
          {
            telegram: {
              [Op.or]: or,
            },
          },
        ],
      };
    }

    const users = await this.userModel.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
      order: [['name', 'ASC']],
    });
    return users;
  }

  // DESKTOP
  async getUserByPhone(phone: string) {
    const user = await this.userModel.findOne({ where: { phone } });
    return user;
  }

  // DESKTOP
  async getUser(id: number) {
    const user = await this.userModel.findOne({ where: { id: id } });
    return user;
  }

  // DESKTOP, MOBILE
  async updateUser(updateUserDto: UpdateUserDto) {
    const { id, phone } = updateUserDto;

    if (phone) {
      const candidate = await this.userModel.findOne({
        where: {
          id: { [Op.ne]: id },
          phone,
        },
      });
      if (candidate) {
        throw new HttpException(
          'Пользователь с таким номером телефона уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const user = await this.getUser(id);
    await this.userModel.update(updateUserDto, {
      where: { id },
    });
    const updatedUser: Partial<User> = { ...user.dataValues, ...updateUserDto };
    return updatedUser;
  }

  // MOBILE
  async updateUserPassword(updateUserPasswordDto: UpdateUserPasswordDto) {
    const { id, oldPassword, newPassword } = updateUserPasswordDto;

    const user = await this.userModel.findOne({ where: { id } });

    const passwordEquals = await bcrypt.compare(oldPassword, user.password);
    if (!passwordEquals) {
      throw new HttpException(
        'Введен неверный старый пароль',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 5);
    await this.userModel.update({ password: hashPassword }, { where: { id } });

    return user;
  }
}
