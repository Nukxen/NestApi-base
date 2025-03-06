import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/backend/prisma.service';
import { User } from './dto/create-user.dto';

@Injectable()
export class CRUDService {
  //private readonly users: User[] = []; // Alterado para User[]
  db = new PrismaService();
  async create(u: User) {
    console.log('Creating user:', u);
    await this.db.user.create({
      data: {
        name: u.name,
        email: u.email,
        telefone: u.telefone,
      },
    });
    //this.users.push(u);
  }

  async getUsers(): Promise<User[]> {
    var u: User[] = await this.db.user.findMany();

    console.log('Returning users:', u);
    return u;
  }
}
