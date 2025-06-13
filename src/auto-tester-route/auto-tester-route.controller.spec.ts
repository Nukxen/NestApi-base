import { Test, TestingModule } from '@nestjs/testing';
import { AutoTesterRouteController } from './auto-tester-route.controller';
import { AutoTesterRouteService } from './auto-tester-route.service';

describe('AutoTesterRouteController', () => {
  let controller: AutoTesterRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoTesterRouteController],
      providers: [AutoTesterRouteService],
    }).compile();

    controller = module.get<AutoTesterRouteController>(AutoTesterRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
