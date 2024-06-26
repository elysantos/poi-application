import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaComponent } from './components/tabela/tabela.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { BffService } from './domain/services/bff.service';
import { Permanencia } from './domain/interfaces/permanencia';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabelaComponent, FiltroComponent, CommonModule, MatToolbar, MatCard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web-front';
  permanencias: Permanencia[] = [];
  
  constructor(public service: BffService) {
    this.getDadosPermanencia({placa:'', date: ''});
  }


  getDadosPermanencia(filters: { placa: string; date: string }): void {
    this.service.getPermanencia(filters).subscribe(ps => this.permanencias = ps);
    console.log(this.permanencias);
  }

  onApplyFilters(filters: { placa: string; date: string }): void {
    this.getDadosPermanencia(filters);
  }
  
  onResetFilters(): void {
    console.log('reset');
    // this.fetchData();
  }
}
