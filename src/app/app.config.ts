import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { retryErrorInterceptor } from './tools/interceptor/retry-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
              provideHttpClient( 
                withFetch(),
                withInterceptors([retryErrorInterceptor])
                 ),
              provideClientHydration(),
              provideAnimations()],
  
              
};
