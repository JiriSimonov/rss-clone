import {Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {login, loginFailed, loginSuccess} from './auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AdminAuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => this.authService.login({
      username: action.login,
      password: action.password
    }).pipe(
      map(loginSuccessData => loginSuccess(loginSuccessData)),
      catchError(
        error => of(loginFailed({
          serverError: error.message
        }))
      )
    ))
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }
}
