import { Controller, Get } from '@nestjs/common';
import { PosicaoService } from 'src/domain/service/posicao/posicao.service';

@Controller('posicao')
export class PosicaoController {

    constructor(private readonly posicaoService: PosicaoService) {}

    @Get('/')
    findAll(): any { 
        return this.posicaoService.findPosicoes();
    }

    @Get('/placas')
    findPlacas(): any {
        return this.posicaoService.findPlacas();
    }
}

