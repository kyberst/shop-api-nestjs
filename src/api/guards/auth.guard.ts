import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from '@/shared/types/auth.interface';
import { authenticateRequest } from '@/shared/utils/auth.util';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: RequestUser }>();
    
    request['user'] = authenticateRequest(request.headers.authorization, request.cookies);
    
    return true;
  }
}

