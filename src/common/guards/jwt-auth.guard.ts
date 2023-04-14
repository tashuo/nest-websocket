import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ALLOW_GUEST } from 'src/constants/app';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    if (
      this.reflector.getAllAndOverride(ALLOW_GUEST, [
        context.getHandler(),
        context.getClass(),
      ])
    ) {
      return true;
    }
    return super.canActivate(context) as boolean;
  }
}
