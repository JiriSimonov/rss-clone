import { loginFailed } from '../store/auth.actions';
import { catchError, mergeMap } from 'rxjs/operators';
import { getAccessToken } from '../store/auth.selectors';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, first, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store$: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store$.pipe(
      select(getAccessToken),
      first(),
      mergeMap((token) => {
        const authRequest = token
          ? request.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            })
          : request;
        return next.handle(authRequest).pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.store$.dispatch(loginFailed({ serverError: err.message }));
                return EMPTY;
              }
            }
            throw err;
          })
        );
      })
    );
  }
}
