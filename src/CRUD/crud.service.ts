import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/backend/prisma.service';
import { User } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class CRUDService {
  db = new PrismaService();
  async createUser(u: User) {
    //console.log('Creating user:', u);
    try {
      await this.db.user.create({
        data: {
          name: u.name,
          email: u.email,
          telefone: u.telefone,
        },
      });
    } catch (e) {
      console.log('Erro:', e);
    }
  }
  async getUser(data: { id: number }): Promise<User | null> {
    try {
      const foundUser = await this.db.user.findUnique({
        where: {
          id: data.id,
        },
      });
      return foundUser;
    } catch (e) {
      console.log('Erro:', e);
    }
    return null;
  }
  async getUsers(): Promise<User[] | null> {
    try {
      var u: User[] = await this.db.user.findMany();
      //console.log('Returning users:', u);
      return u;
    } catch (e) {
      console.log('Erro:', e);
    }
    return null;
  }
  async updateUser(newData: UpdateUserDto) {
    console.log('Atualizando dados do usuario:', newData);
    try {
      await this.db.user.update({
        where: {
          id: newData.id,
        },
        data: newData,
      });
    } catch (e) {
      console.log('Erro:', e);
    }
  }
  async deleteUser(inpData: UpdateUserDto) {
    console.log('Deletando usuario:', inpData.id, ' | ', inpData.name, '...');
    try {
      await this.db.user.delete({
        where: {
          id: inpData.id,
        },
      });
    } catch (e) {
      console.log('Erro:', e);
    }
  }
}
