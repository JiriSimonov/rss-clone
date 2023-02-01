import { AuthData } from './../store/auth.reducer';
import { getAuthData } from './../store/auth.selectors';
import { Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = this.store$.select(getAuthData);

  constructor(
    private httpClient: HttpClient,
    private store$: Store,
    private jwtHelperService: JwtHelperService
  ) {}

  login(body: { username: string; password: string }) {
    return this.httpClient
      .post<AuthData>('https://dummyjson.com/auth/login', body)
      .pipe(
        map((res) => {
          return { ...res, ...this.jwtHelperService.decodeToken(res.token) };
        })
      );
  }

  signUp(body: { login: string; password: string }) {
    return this.httpClient.post<{ login: string; password: string }>(
      'https://wdym-js-er-sd.onrender.com/users/create',
      body
    );
  }

  getUserById(id: number) {
    return this.httpClient.get<{ login: string; password: string }>(
      `https://wdym-server.up.railway.app/users/id/${id}`
    );
  }

  refresh() {
    return this.httpClient
      .post<AuthData>('https://dummyjson.com/auth/login', {})
      .pipe(
        map((res) => {
          return { ...res, ...this.jwtHelperService.decodeToken(res.token) };
        })
      );
  }
}
