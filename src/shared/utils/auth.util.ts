import * as jwt from 'jsonwebtoken';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { RequestUser } from '../types/auth.interface';
import { AppException } from '../errors/app-exception';
import { ResultInfo } from '../types/result-info';

export const extractToken = (authHeader?: string, cookies?: Record<string, any>, cookieName: string = 'auth_token'): string | undefined => {
  let token: string | undefined;

  // Check Authorization header first
  const [type, tokenValue] = authHeader?.split(' ') ?? [];
  if (type === 'Bearer' && tokenValue) {
    token = tokenValue;
  }

  // Fallback to cookie
  if (!token && cookies && cookies[cookieName]) {
    token = cookies[cookieName] as string;
  }

  return token;
};

export const verifyToken = (token: string, secret: string): RequestUser => {
  try {
    const payload = jwt.verify(token, secret);
    if (payload && typeof payload === 'object' && payload.userId) {
      return {
        id: (payload as jwt.JwtPayload).userId as string,
        email: (payload as jwt.JwtPayload).email as string,
        role: (payload as jwt.JwtPayload).role as string,
      };
    } else {
      throw new AppException(ResultInfo.BadRequest('INVALID_TOKEN_PAYLOAD', 'Invalid token payload'));
    }
  } catch (err) {
    if (err instanceof AppException) throw err;
    throw new AppException(ResultInfo.BadRequest('INVALID_EXPIRED_TOKEN', 'Invalid or expired token'));
  }
};

export const checkUserRole = (user: any, requiredRoles: string[]): void => {
  if (!user || !user.role) {
    throw new ForbiddenException('User has no assigned role');
  }

  const hasRole = requiredRoles.some((role) => user.role === role);
  
  if (!hasRole) {
    throw new ForbiddenException(`User role '${user.role}' does not have permission to access this resource`);
  }
};

export const authenticateRequest = (
  authHeader?: string,
  cookies?: Record<string, any>,
  secret: string = process.env.JWT_SECRET!
): RequestUser => {
  if (!process.env.JWT_SECRET && secret === 'super-secret-key-change-me') {
     throw new AppException(ResultInfo.InternalError('JWT_SECRET environment variable is not defined'));
  }
  const token = extractToken(authHeader, cookies);

  if (!token) {
    throw new UnauthorizedException('No authentication token found');
  }

  try {
    return verifyToken(token, secret);
  } catch (err: any) {
    throw new UnauthorizedException(err.message || 'Invalid or expired token');
  }
};

