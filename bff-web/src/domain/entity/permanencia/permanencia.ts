import { Poi } from "../poi/poi";
import * as moment from 'moment';

export class Permanencia {
    placa: string;
    poi: Poi;
    inicio: Date;
    final: Date;

    public getIntervalo(): string {
        const duration = moment.duration(this.final.getTime() - this.inicio.getTime());
        return duration.asMinutes().toFixed(1);
    }

    constructor(placa: string, poi: Poi, dateInicio: Date, dateFinal: Date) {
        this.placa = placa;
        this.poi = poi;
        this.inicio = dateInicio;
        this.final = dateFinal;
    }
}
