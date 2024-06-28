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
      return observableOf(this.data);
  }


  disconnect(): void {}

}
