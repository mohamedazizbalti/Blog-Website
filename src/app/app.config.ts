import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { AuthInterceptorProvider } from './auth/interceptors/auth.interceptor';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AuthInterceptorProvider,
    provideHttpClient(withInterceptorsFromDi()),
    FontAwesomeModule
  ]
};
