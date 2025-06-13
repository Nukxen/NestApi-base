import { Controller } from '@nestjs/common';
import { AutoTesterRouteService } from './auto-tester-route.service';

@Controller('auto-tester-route')
export class AutoTesterRouteController {
  constructor(private readonly autoTesterRouteService: AutoTesterRouteService) {}
}
