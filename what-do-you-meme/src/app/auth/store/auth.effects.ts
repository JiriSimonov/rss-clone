import { select } from '@ngrx/store';
import { isAuth } from './auth.selectors';
import { Store } from '@ngrx/store';
import { AuthData } from './auth.reducer';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginFailed,
  loginSuccess,
  initAuth,
  logoutSuccess,
  extractLoginData,
  logout,
} from './auth.actions';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { of, timer, first, fromEvent } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService
          .login({
            username: action.username,
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

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      switchMap((action: AuthData) =>
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
        this.authService
          .refresh()
          .pipe(map((loginSuccessData) => loginSuccess(loginSuccessData)))
      )
    )
  );

  saveAuthDataToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((loginSuccessData) => {
          const { type, ...authData } = loginSuccessData;
          localStorage.setItem('authData', JSON.stringify(authData));
        })
      ),
    { dispatch: false }
  );

  extractLoginData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth, extractLoginData),
      map(() => {
        const authDataFromLocalStorage = localStorage.getItem('authData');
        if (!authDataFromLocalStorage) {
          return logoutSuccess();
        }
        const authData: AuthData = JSON.parse(authDataFromLocalStorage);
        if (authData.exp * 1000 - 10 * 1000 - Date.now() < 0) {
          return logoutSuccess();
        }
        return loginSuccess(authData);
      })
    )
  );

  listenStorageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth),
      switchMap(() => fromEvent(window, 'storage')),
      map(() => extractLoginData())
    )
  );

  // logout$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(logout),
  //     map(() => {
  //       localStorage.removeItem('authData');
  //       return logoutSuccess();
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store$: Store
  ) {}
}
