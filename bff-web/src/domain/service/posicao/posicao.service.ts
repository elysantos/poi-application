import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export class PosicaoService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) { }

    private readonly baseUrl = this.configService.get('baseUrl');
    private readonly logger = new Logger(PosicaoService.name);

    public findPosicoes(): Observable<AxiosResponse<Array<any>>> {
        let poiUrl = this.baseUrl + '/posicao';
        return this.httpService.get(poiUrl).pipe(
            map(response => response.data),
            catchError((error) => {
                this.logger.error(error);
                throw 'An error happened!';
              }
            )
        );
    }

    public  findPlacas() {
        let placaUrl = this.baseUrl + '/posicao/placas';
        return this.httpService.get(placaUrl).pipe(
            map(response => response.data)
        );
    }
}
