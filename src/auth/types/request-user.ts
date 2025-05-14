import { Request } from 'express';
import { User } from '../entities/usuarios.entity';

export interface RequestWithUser extends Request {
  user: User;
}
