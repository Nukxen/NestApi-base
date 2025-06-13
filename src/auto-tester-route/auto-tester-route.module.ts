import { Module } from '@nestjs/common';
import { AutoTesterRouteService } from './auto-tester-route.service';
import { AutoTesterRouteController } from './auto-tester-route.controller';

@Module({
  controllers: [AutoTesterRouteController],
  providers: [AutoTesterRouteService],
})
export class AutoTesterRouteModule {}
