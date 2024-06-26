import { Posicao } from "src/domain/entity/posicao/posicao";

export class PosicaoDTO {
    id: number;
    placa: string;
    data: string;
    velocidade: number;
    longitude: number;
    latitude: number;
    ignicao: boolean;

    mapToPosicao() {
        const posicao = new Posicao();
        posicao.id = this.id;
        posicao.placa = this.placa;
        posicao.data = new Date(this.data);
        posicao.velocidade = this.velocidade;
        posicao.longitude = this.longitude;
        posicao.latitude = this.latitude;
        posicao.ignicao = this.ignicao;
        return posicao;
    }
}
