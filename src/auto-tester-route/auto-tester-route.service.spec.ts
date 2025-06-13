import { Test, TestingModule } from '@nestjs/testing';
import { AutoTesterRouteService } from './auto-tester-route.service';

describe('AutoTesterRouteService', () => {
  let service: AutoTesterRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoTesterRouteService],
    }).compile();

    service = module.get<AutoTesterRouteService>(AutoTesterRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
