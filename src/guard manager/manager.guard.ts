import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ManagerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (session && session.roleUser === 'manager') {
      return true;
    } else {
      throw new UnauthorizedException('You do not have permission to access this resource login as manager!!!');
    }
  }
}
