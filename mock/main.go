package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

type Posicao struct {
	Id          int64   `json:"id"`
	Placa       string  `json:"placa"`
	DataPosicao string  `json:"data"`
	Velocidade  int     `json:"velocidade"`
	Longitude   float64 `json:"longitude"`
	Latitude    float64 `json:"latitude"`
	Ignicao     bool    `json:"ignicao"`
}

func getPlacas(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	file, err := os.ReadFile("resources/placas.json")
	if err != nil {
		http.Error(w, "Erro ao ler o arquivo JSON", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(file)

}

func getPois(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	file, err := os.ReadFile("resources/poi.json")
	if err != nil {
		http.Error(w, "Erro ao ler o arquivo JSON", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(file)
}
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
func getPermanencia(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	file, err := os.ReadFile("resources/permanencia.json")
	if err != nil {
		http.Error(w, "Erro ao ler o arquivo JSON", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(file)
}

func getPosicoes(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	file, err := os.ReadFile("resources/posicao.json")
	if err != nil {
		http.Error(w, "Erro ao ler o arquivo JSON", http.StatusInternalServerError)
		return
	}
	var posicoes []Posicao
	err = json.Unmarshal(file, &posicoes)
	if err != nil {
		return
	}

	query := req.URL.Query()

	placa := query.Get("placa")
	data := query.Get("data")
	if placa != "" {
		posicoes = fitrarPorPlaca(posicoes, placa)
	}
	if data != "" {
		posicoes, err = filtrarPorData(posicoes, data)
		if err != nil {
			fmt.Println("Error %", err.Error())
		}
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(posicoes)
	if err != nil {
		return
	}

}

func fitrarPorPlaca(posicoes []Posicao, placa string) []Posicao {
	var resultado []Posicao
	for _, pos := range posicoes {
		if pos.Placa == placa {
			resultado = append(resultado, pos)
		}
	}
	return resultado
}

func filtrarPorData(posicoes []Posicao, dataBusca string) ([]Posicao, error) {
	var resultado []Posicao
	layoutBusca := "02-01-2006"
	data, err := time.Parse(layoutBusca, dataBusca)

	if err != nil {
		return posicoes, err
	}
	for _, pos := range posicoes {
		layout := "2006-01-02T15:04:05.000-07:00"
		dataPosicao, errPos := time.Parse(layout, pos.DataPosicao)

		if errPos != nil {
			resultado = append(resultado, pos)
		} else {
			if dataPosicao.Year() == data.Year() && dataPosicao.Month() == data.Month() && dataPosicao.Day() == data.Day() {
				resultado = append(resultado, pos)
			}
		}
	}
	return resultado, nil
}

func main() {
	http.HandleFunc("/pois", getPois)
	http.HandleFunc("/posicao", getPosicoes)
	http.HandleFunc("/posicao/placas", getPlacas)
	http.HandleFunc("/permanencia", getPermanencia)
	http.ListenAndServe(":8080", nil)
}
