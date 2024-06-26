import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import  configuration  from './infra/config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoiController } from './app/controller/poi/poi.controller';
import { PoiService } from './domain/service/poi/poi.service';
import { HttpModule } from '@nestjs/axios';
import { PlacasController } from './app/controller/placas/placas.controller';
import { PosicaoService } from './domain/service/posicao/posicao.service';
import { PosicaoController } from './app/controller/posicao/posicao.controller';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  }),
  HttpModule
],
  controllers: [AppController, PoiController, PlacasController, PosicaoController],
  providers: [AppService, PoiService, PosicaoService],
})
export class AppModule {}
