import { Controller, Get, Param, Query } from '@nestjs/common';
import { PoiService } from '../../../domain/service/poi/poi.service';

@Controller('pois')
export class PoiController {
    constructor(private readonly poiService: PoiService) {}
    
    @Get('/')
    findAll(): any { 
        return this.poiService.findAll();
    }

    @Get('/permanencia')
    findPermanencia(@Query('data') date: string,  @Query('placa') placa: string): any {
        return this.poiService.getPermanencia(date, placa);
    }
}