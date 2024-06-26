import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permanencia } from '../interfaces/permanencia';

@Injectable({
  providedIn: 'root'
})
export class BffService {

  private urlBase: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getPlacas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBase}/posicao/placas`)
  }

  getPermanencia(filters: { placa: string; date: string }): Observable<Permanencia[]> {
    let query = {
        params: {
          placa: '',
          data: ''
        }
      };
    
    if(filters.placa != ''){
      query.params.placa = filters.placa;
    }
    if(filters.date != ''){
      query.params.data = filters.date;
    }
    return this.http.get<Permanencia[]>(`${this.urlBase}/pois/permanencia`, query)
  }
}
