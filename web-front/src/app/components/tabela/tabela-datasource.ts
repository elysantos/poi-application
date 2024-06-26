import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Permanencia } from '../../domain/interfaces/permanencia';


export class TabelaDataSource extends DataSource<Permanencia> {
  data: Permanencia[] = this.permanencias;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private permanencias: Permanencia[]) {
    super();
    this.data = permanencias;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Permanencia[]> {
    // if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return observableOf(this.data);
    // } else {
    //   throw Error('Please set the paginator and sort on the data source before connecting.');
    // }
  }


  disconnect(): void {}

  // private getPagedData(data: Permanencia[]): Permanencia[] {
  //   if (this.paginator) {
  //     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //     return data.splice(startIndex, this.paginator.pageSize);
  //   } else {
  //     return data;
  //   }
  // }

//   private getSortedData(data: Permanencia[]): Permanencia[] {
//     if (!this.sort || !this.sort.active || this.sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       const isAsc = this.sort?.direction === 'asc';
//       switch (this.sort?.active) {
//         case 'name': return compare(a.placa, b.placa, isAsc);
//         case 'id': return compare(+a.poi.id, +b.poi.id, isAsc);
//         default: return 0;
//       }
//     });
//   }
// }
}
/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a: string | number, b: string | number, isAsc: boolean): number {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
