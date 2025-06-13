import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoTesterRouteModule } from './auto-tester-route/auto-tester-route.module';



@Module({
  imports: [AutoTesterRouteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
