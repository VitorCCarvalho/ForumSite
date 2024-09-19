import { HttpInterceptorFn } from '@angular/common/http';
import { request } from 'http';
import { retryWhen, concatMap, of, throwError, delay } from 'rxjs';


export const retryCount = 3
export const retryWaitMs = 500

export const retryErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retryWhen(error => 
        error.pipe(
            concatMap((error, count) => {
                if(count <= retryCount && error.status == 500){
                    return of(error)
                }
                return throwError(error);
            }),
            delay(retryWaitMs)
        )
    )
)
};
