import { Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy(){
        await this.$disconnect()
    }
}

// O "implements OnModuleInit" serve para que quando a aplicação NestJS inicie, ela já se conecte com o banco de dados. 
// O "implements OnModuleDestroy" serve para que quando a aplicação NestJS feche, ela já se desconecte do banco de dados. 
