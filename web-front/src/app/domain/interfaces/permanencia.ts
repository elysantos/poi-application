import { Poi } from "./poi";

export interface Permanencia {
    poi: Poi,
    placa: string,
    dataInicial: Date,
    dataFinal: Date,
    intervalo: number
}
