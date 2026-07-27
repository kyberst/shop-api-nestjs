import { User } from './user.entity';

export interface Session {
  token: string;
  user: User;
}

export class SessionEntity implements Session {
  public readonly user: User;

  constructor(
    public readonly token: string,
    user: User
  ) {
    if (!user) {
      throw new Error('Session requires a valid User entity');
    }
    this.user = user;
    this.validate();
  }

  public validate(): void {
    if (!this.token || this.token.trim() === '') {
      throw new Error('Token cannot be empty');
    }
    if (!this.user) {
      throw new Error('User is required for session');
    }
  }

  static create(token: string, user: User): SessionEntity {
    return new SessionEntity(token, user);
  }
}

