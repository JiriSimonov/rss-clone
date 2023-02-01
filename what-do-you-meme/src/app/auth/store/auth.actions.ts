import { AuthData } from './auth.reducer';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] login',
  props<{ login: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] login success',
  props<{ authData: AuthData }>()
);
export const loginFailed = createAction(
  '[Auth] login failed',
  props<{ serverError: string }>()
);
export const initAuth = createAction('[Auth] initAuth');
export const logoutSuccess = createAction('[Auth] logout');
export const extractLoginData = createAction('[Auth] extractLoginData');
