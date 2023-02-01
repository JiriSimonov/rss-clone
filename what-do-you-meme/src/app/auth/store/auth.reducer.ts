import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailed,
  loginSuccess,
  logoutSuccess,
} from './auth.actions';

export const USER_AUTH_FEATURENAME = 'auth';

export interface AuthData {
  token: string;
  username: string;
  id: number;
  iat: number;
  exp: number;
  image: string;
}

export interface AuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData?: AuthData | null;
}

const initialState: AuthState = {
  loaded: true,
  loading: false,
  serverError: '',
};

export const AuthReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
  })),
  on(loginSuccess, (state, { authData }) => ({
    ...state,
    authData,
    loaded: true,
    loading: false,
    serverError: '',
  })),
  on(loginFailed, (state, { serverError }) => ({
    ...state,
    authData: null,
    loading: false,
    loaded: true,
    serverError,
  })),
  on(logoutSuccess, () => ({
    ...initialState,
    authData: null,
  }))
);
