export interface IHashService {
  hash(data: string): Promise<string>;
  compare(data: string, hash: string): Promise<boolean>;
}

export const IHashService = Symbol('IHashService');

export interface ITokenService {
  sign(payload: object, options?: any): string;
  verify<T>(token: string): T;
}

export const ITokenService = Symbol('ITokenService');
