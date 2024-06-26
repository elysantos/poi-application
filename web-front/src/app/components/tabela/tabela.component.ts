import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TabelaDataSource } from './tabela-datasource';
import { Permanencia } from '../../domain/interfaces/permanencia';
import moment from 'moment';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class TabelaComponent implements AfterViewInit {
  @Input() permanencias!: Permanencia[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Permanencia>;
  dataSource: TabelaDataSource

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    
    this.dataSource = new TabelaDataSource(this.permanencias);
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['poi', 'placa','inicio', 'final', 'permanencia'];
  

  ngAfterViewInit(): void {
    this.updateDataSource();
  }

  ngOnChanges(): void {
    this.updateDataSource();
  }

  updateDataSource(): void {
    this.dataSource = new TabelaDataSource(this.permanencias);
    this.table.dataSource = this.dataSource;
    this.changeDetectorRef.detectChanges();
  }

  formatDate(date: Date): string {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
}
}
