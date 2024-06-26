import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { PosicaoDTO } from '../posicao/dto/posicao.dto';
import { PoiDTO } from '../posicao/dto/poi.dto';
import { Posicao } from 'src/domain/entity/posicao/posicao';
import { Poi } from 'src/domain/entity/poi/poi';
import { Permanencia } from 'src/domain/entity/permanencia/permanencia';
import haversine from 'haversine-distance';
import { PermanenciaDTO } from '../posicao/dto/permanencia.dto';



@Injectable()
export class PoiService {
    findPermancia(id: number): any {
        throw new Error('Method not implemented.');
    }
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) { }

    private readonly baseUrl = this.configService.get('baseUrl');
    private readonly logger = new Logger(PoiService.name);

    public findAll() { 
        return this.httpService.get<PoiDTO[]>(`${this.baseUrl}/pois`).pipe(
            map((response: AxiosResponse<PoiDTO[]>) => {
                return response.data.map(dto => {
                    const poi = new Poi(dto.id, dto.nome, dto.raio, dto.latitude, dto.longitude);
                    return poi;
                });
            }),
            catchError((error) => {
                this.logger.error(error);
                throw 'An error happened!';
              }
            )
        );
    }

    public async getPois(): Promise<Poi[]> {
        let pois: Poi[] = [];
    
        try {
          const response: AxiosResponse<PoiDTO[]> = await lastValueFrom(this.httpService.get<PoiDTO[]>(`${this.baseUrl}/pois`));
          pois = response.data.map(dtoData => {
            const dto = new PoiDTO();
            Object.assign(dto, dtoData);
            return dto.mapToPoi();
          });
    
        } catch (error) {
          this.logger.error('Error fetching POIs', error);
        }
        return pois;
      }

    async getPosicoes(date: string, placa: string) {
        let path = 'posicao';
        let query = {
            params: {
              placa: null,
              data: null
            }
          };
        
        if(placa != ''){
          query.params.placa = placa;
        }
        if(date != ''){
          query.params.data = date;
        }
        console.log(query);

        let posicoes:Posicao[] = [];
        try {
            const response: AxiosResponse<PosicaoDTO[]> = await lastValueFrom(this.httpService.get<PosicaoDTO[]>(`${this.baseUrl}/${path}`, query));
            posicoes = response.data.map(dtoData => {
              const dto = new PosicaoDTO();
              Object.assign(dto, dtoData);
              return dto.mapToPosicao();
            });
      
          } catch (error) {
            this.logger.error('Error fetching POIs', error);
          }

        return posicoes;
    }

    isDentroRaio(latitudeA, longitudeA, latitudeB, longitudeB, raio):boolean {
        let distancia = this.haversineDistance(latitudeA, longitudeA, latitudeB, longitudeB);
        if(distancia <= raio){
            return true;
        }
        return false;
    }

    async getPermanencia(date: string, placa:string) {
        
        let pois = await this.getPois();
        let posicoes =await  this.getPosicoes(date, placa);
        let permanencias: Permanencia[] = [];

        posicoes?.forEach(posicao => {
        
           pois?.forEach(poi => {
            if(this.isDentroRaio(posicao.latitude, posicao.longitude, poi.latitude, poi.longitude, poi.raio)){
                let existe = permanencias.find(p => p.placa == posicao.placa && p.poi.id == poi.id);
                if(existe) {
                    if(existe.inicio > posicao.data){
                        // console.log(existe, posicao.data);
                        existe.inicio = posicao.data;
                    }
                    if(existe.final < posicao.data) {
                        existe.final = posicao.data;
                    }

                }else {
                    let pe = new Permanencia(posicao.placa, poi, posicao.data, posicao.data);
                    permanencias.push(pe);
                }
            }
           })
        });

        // console.log(permanencias?.length|| 'permanencias nulo');

        return permanencias.map(permanencia => {
            const dto = new PermanenciaDTO(permanencia.placa, permanencia.poi, permanencia.inicio, permanencia.final, permanencia.getIntervalo());
            return dto;
        });
    }


    haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRadian = angle => (Math.PI / 180) * angle;
        const distance = (a, b) => (Math.PI / 180) * (a - b);
        const RADIUS_OF_EARTH_IN_KM = 6371;

        const dLat = distance(lat2, lat1);
        const dLon = distance(lon2, lon1);

        lat1 = toRadian(lat1);
        lat2 = toRadian(lat2);

        // Haversine Formula
        const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.asin(Math.sqrt(a));

        let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

        return finalDistance;
    };
    
}


