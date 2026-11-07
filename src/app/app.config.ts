import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryData } from './service/in-memory-data';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    
  ]
};