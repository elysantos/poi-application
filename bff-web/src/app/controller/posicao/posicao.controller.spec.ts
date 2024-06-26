import { Test, TestingModule } from '@nestjs/testing';
import { PosicaoController } from './posicao.controller';

describe('PosicaoController', () => {
  let controller: PosicaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosicaoController],
    }).compile();

    controller = module.get<PosicaoController>(PosicaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
