import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  REQUIRED_DESKTOP_APP_VERSION,
  REQUIRED_MOBILE_APP_VERSION,
} from './common/constants/app';
import getNumbersByString from './common/helpers/getNumbersByString';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CheckVersionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const notCheck = this.reflector.getAllAndOverride<boolean>('notCheck', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (notCheck) return true;
    try {
      const req = context.switchToHttp().getRequest();
      const header = req.headers.authorization;
      const params: string[] = header.split(' ');
      const desktopAppVersion = params.find((param) =>
        param.includes('desktop'),
      );
      const mobileAppVersion = params.find((param) => param.includes('mobile'));

      if (!desktopAppVersion && !mobileAppVersion) {
        throw new UnauthorizedException({
          message: 'Доступно обязательное обновление',
        });
      } else if (desktopAppVersion) {
        if (
          REQUIRED_DESKTOP_APP_VERSION > getNumbersByString(desktopAppVersion)
        ) {
          throw new UnauthorizedException({
            message: 'Доступно обязательное обновление',
          });
        }
      } else if (mobileAppVersion) {
        if (
          REQUIRED_MOBILE_APP_VERSION > getNumbersByString(mobileAppVersion)
        ) {
          throw new UnauthorizedException({
            message: 'Доступно обязательное обновление',
          });
        }
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Доступно обязательное обновление',
      });
    }
  }
}

export const NotCheckVersionGuard = () => SetMetadata('notCheck', true);
