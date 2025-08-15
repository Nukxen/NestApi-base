import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // para ser utilizado globalmente, sem necessidade de importar em todos os módulos.
@Module({
  providers: [PrismaService],
  exports: [PrismaService] // Para ser utilizado por outros services, se não ele fica privado.
})
export class PrismaModule { }