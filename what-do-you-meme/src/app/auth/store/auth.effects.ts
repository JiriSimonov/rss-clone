import { select } from '@ngrx/store';
import { isAuth } from './auth.selectors';
import { Store } from '@ngrx/store';
import { AuthData } from './auth.reducer';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailed, loginSuccess } from './auth.actions';
import {
  catchError,
  delayWhen,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of, timer, first } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminAuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService
          .login({
            username: action.login,
            password: action.password,
          })
          .pipe(
            map((loginSuccessData) => loginSuccess(loginSuccessData)),
            tap(() => this.router.navigate(['lobbies'], { replaceUrl: true })),
            catchError((error) =>
              of(
                loginFailed({
                  serverError: error.message,
                })
              )
            )
          )
      )
    )
  );

  refreash$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      delayWhen((action: AuthData) =>
        timer(action.exp * 1000 - 60 * 1000 - Date.now())
      ),
      switchMap(() =>
        this.store$.pipe(
          select(isAuth),
          first(),
          filter((isUserAuth) => isUserAuth)
        )
      ),
      switchMap(() =>
        this.authService.refresh().pipe(
          map((loginSuccessData) => loginSuccess(loginSuccessData)),
          catchError((error) =>
            of(
              loginFailed({
                serverError: error.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store$: Store
  ) {}
}
