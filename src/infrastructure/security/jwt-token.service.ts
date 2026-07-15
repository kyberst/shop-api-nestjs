import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ITokenService } from '@/application/interfaces/security/security.interface';
import { AppException } from '@/shared/errors/app-exception';
import { ResultInfo } from '@/shared/types/result-info';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new AppException(ResultInfo.InternalError('JWT_SECRET environment variable is not defined'));
    }
  }

  private readonly secret = process.env.JWT_SECRET!;

  sign(payload: object, options?: any): string {
    return jwt.sign(payload, this.secret, options);
  }

  verify<T>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }
}
