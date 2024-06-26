import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BffService } from './domain/services/bff.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    BffService,
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch()
    ),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },]
};
