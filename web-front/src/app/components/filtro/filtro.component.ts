import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BffService } from '../../domain/services/bff.service';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroComponent {

  @Output() applyFilters = new EventEmitter<{ placa: string; date: string }>();
  @Output() resetFilters = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private service: BffService) {
    this.getPlacas();
  }

  searchForm = this.fb.group({
    filtroPlaca: '',
    filtroData: '',
  })

  filtersApplied: boolean = false;

  onSubmit(): void {
    // if (this.searchForm.get('filtroPlaca')?.value == '') {
    //   return;
    // }
    this.applyFilters.emit({
      placa: this.searchForm.get('filtroPlaca')?.value || '',
      date: this.formatDate(this.searchForm.get('filtroData')?.value + '' || ''),
    });
  }

  placas:string[] = [];

  doResetFilters(): void {
    this.searchForm.reset();
    this.resetFilters.emit();
  }


  private formatDate(dateStr: string): string {
    if (!dateStr || dateStr === '') return '';
    const formatDate = new Date(dateStr);
    const [week, month, day, year] = formatDate.toDateString().split(' ');
    if(day === undefined || year === undefined) return '';
    return `${day}/${formatDate.getMonth() + 1}/${year}`;
  }

  getPlacas() {
    this.service.getPlacas().subscribe(ps => { this.placas = ps; });
  }

}
