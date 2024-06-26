import { Poi } from "src/domain/entity/poi/poi";

export class PoiDTO {
    id: number;
    nome: string;
    raio: number;
    latitude: number;
    longitude: number;

    public mapToPoi(): Poi {
        const poi = new Poi(this.id, this.nome, this.raio, this.latitude, this.longitude);
        return poi;
    }
}
