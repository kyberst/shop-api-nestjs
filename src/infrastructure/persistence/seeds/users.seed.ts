import * as bcrypt from 'bcryptjs';
import { User } from '@/domain/entities/user.entity';

export const seedUsers: User[] = [
  User.create({ 
    id: '3c09b69b-c3fb-4632-bd78-b32bc765ea93', 
    email: 'admin@industrial.com', 
    password: bcrypt.hashSync('Admin!234', 10), 
    name: 'Admin User', 
    role: 'admin' 
  }),
  User.create({ 
    id: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0', 
    email: 'sales@industrial.com', 
    password: bcrypt.hashSync('Sales!234', 10), 
    name: 'Sales User', 
    role: 'sales' 
  }),
  User.create({ 
    id: '776262b9-e1e3-4682-840a-5c1fa5f16259', 
    email: 'test@test.com', 
    password: bcrypt.hashSync('Test!234', 10), 
    name: 'Test User', 
    role: 'user' 
  })
];
