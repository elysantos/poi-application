import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { PoiService } from './domain/service/poi/poi.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    console.log(this.configService.get<string>("baseUrl"));
    return this.appService.getHello();
  }

  // @Get('/pois')
  // getPois(): any { 
  //   // return this.poiService.findAll();
  // }
}
