import jwt from 'jsonwebtoken';
import { AppException } from '@/shared/errors/app-exception';
import { ResultInfo } from '@/shared/types/result-info';

export class JwtAdapter {
  private readonly secret: string;
  private readonly expiresIn = '7d';

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new AppException(ResultInfo.InternalError('JWT_SECRET environment variable is not defined'));
    }
    this.secret = process.env.JWT_SECRET;
  }

  sign(payload: string | Buffer | object): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): string | jwt.JwtPayload | null {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null;
    }
  }
}

export const jwtAdapter = new JwtAdapter();
