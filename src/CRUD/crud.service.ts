import { Injectable } from '@nestjs/common';
import { User } from './dto/create-user.dto';

@Injectable()
export class CRUDService {
  private readonly users: User[] = []; // Alterado para User[]

  create(u: User) {
    console.log('Creating user:', u);
    this.users.push(u);
  }

  getUsers(): User[] {
    console.log('Returning users:', this.users);
    return this.users;
  }
}
