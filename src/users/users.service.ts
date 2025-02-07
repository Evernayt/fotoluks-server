import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';
import { MoyskladService } from 'src/moysklad/moysklad.service';
import { getAccumulationDiscount } from 'src/common/helpers/moysklad';
import correctSearch from 'src/common/helpers/correctSearch';
import { Literal } from 'sequelize/types/utils';
import correctPhone from 'src/common/helpers/correctPhone';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private moyskladService: MoyskladService,
  ) {}

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
    search = correctPhone(correctSearch(search));

    let where: WhereOptions<User> = { archive };
    let literalWhere: Literal;

    if (search) {
      literalWhere = Sequelize.literal(
        `MATCH(User.name, surname, patronymic, phone, email, vk, telegram) 
        AGAINST('*${search}*' IN BOOLEAN MODE)`,
      );
    }

    const users = await this.userModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      where: [where, literalWhere],
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

    await this.userModel.update(updateUserDto, {
      where: { id },
    });
    const user = await this.getUser(id);
    return user;
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

  // DESKTOP
  async syncOneFromMoysklad(moyskladId: string) {
    let user = null;
    try {
      const counterpartyData = await this.moyskladService.getCounterparties({
        id: moyskladId,
      });
      if (counterpartyData?.rows.length) {
        const counterparty = counterpartyData.rows[0];
        const updatedUser = {
          discount: getAccumulationDiscount(counterparty.discounts),
        };
        await this.userModel.update(updatedUser, {
          where: { moyskladId },
        });
        user = updatedUser;
      } else {
        throw new HttpException(
          'Контрагент не найден в МойСклад',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        error || 'Не удалось синхронизировать',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
