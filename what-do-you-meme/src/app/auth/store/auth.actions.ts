import {createAction, props} from "@ngrx/store";

export const login = createAction('[Auth] login', props<{login: string, password: string}>());
export const loginSuccess = createAction('[Auth] login success', props<{accessToken: string}>());
export const loginFailed = createAction('[Auth] login failed', props<{serverError: string}>());
