import { LocalStorageService } from '../../shared/storage/services/local-storage/local-storage.service';
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

} from './auth.actions';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { of, timer, first, fromEvent } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {Socket} from "ngx-socket-io";

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
          this.localStorage.setItem('authData', authData);
          const {username, image} = authData;
          const {username:socketUsername} = this.socket.ioSocket.auth;
          if (!(username === socketUsername)) {
          this.socket.disconnect();
          this.socket.ioSocket.auth.username = username;
          this.socket.ioSocket.auth.image = image;
          }
          this.socket.connect();
        })
      ),
    { dispatch: false }
  );

  extractLoginData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth, extractLoginData),
      map(() => {
        const authDataFromLocalStorage = this.localStorage.getItem<AuthData>('authData');
        if (!authDataFromLocalStorage) {
          return logoutSuccess();
        }
        const authData: AuthData = authDataFromLocalStorage;
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store$: Store,
    private localStorage: LocalStorageService,
    private socket: Socket
  ) {}
}
