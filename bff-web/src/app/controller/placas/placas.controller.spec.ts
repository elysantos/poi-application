import { Test, TestingModule } from '@nestjs/testing';
import { PlacasController } from './placas.controller';

describe('PlacasController', () => {
  let controller: PlacasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacasController],
    }).compile();

    controller = module.get<PlacasController>(PlacasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
