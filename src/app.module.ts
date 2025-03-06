import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CRUDModule } from './CRUD/crud.module';

@Module({
  imports: [CRUDModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
