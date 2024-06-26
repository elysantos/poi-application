import { Poi } from "src/domain/entity/poi/poi";

export class PermanenciaDTO {
    placa: string;
    poi: Poi;
    inicio: Date;
    final: Date;
    intervalo: string;

    constructor(placa: string, poi: Poi, inicio: Date, final: Date, intervalo: string) {
        this.placa = placa;
        this.poi = poi;
        this.inicio = inicio;
        this.final = final;
        this.intervalo = intervalo;
    }
}
