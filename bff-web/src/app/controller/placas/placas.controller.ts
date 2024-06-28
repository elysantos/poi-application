import { Controller, Get } from '@nestjs/common';
import { PosicaoService } from 'src/domain/service/posicao/posicao.service';

@Controller('placas')
export class PlacasController {

    constructor(private readonly service: PosicaoService) {}

    @Get('')
    findAll(): any { 
        return this.service.findPlacas();
    }

    
}
