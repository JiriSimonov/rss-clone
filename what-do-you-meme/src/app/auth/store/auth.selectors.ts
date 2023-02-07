import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, USER_AUTH_FEATURENAME } from './auth.reducer';

const getFeature = createFeatureSelector<AuthState>(USER_AUTH_FEATURENAME);
export const getLoading = createSelector(getFeature, (state) => state.loading);
export const getLoaded = createSelector(getFeature, (state) => state.loaded);
export const getServerError = createSelector(
  getFeature,
  (state) => state.serverError
);
export const getAuthData = createSelector(
  getFeature,
  (state) => state.authData
);
export const getAccessToken = createSelector(
  getAuthData,
  (authData) => authData && authData.access_token
);
export const isAuth = createSelector(
  getAccessToken,
  (accessToken) => !!accessToken
);
