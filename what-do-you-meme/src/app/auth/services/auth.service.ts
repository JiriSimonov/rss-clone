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
  private URL = 'https://wdym-js-er-sd.onrender.com';

  constructor(
    private httpClient: HttpClient,
    private store$: Store,
    private jwtHelperService: JwtHelperService
  ) {}

  login(body: { username: string; password: string }) {
    return this.httpClient.post<AuthData>(`${this.URL}/auth/login`, body).pipe(
      map((res) => {
        return {
          ...res,
          ...this.jwtHelperService.decodeToken(res.access_token),
        };
      })
    );
  }

  signUp(body: { username: string; password: string }) {
    return this.httpClient.post<{ username: string; password: string }>(
      `${this.URL}/users`,
      body
    );
  }

  getUserById(id: number) {
    return this.httpClient.get<{ username: string; password: string }>(
      `https://wdym-server.up.railway.app/users/id/${id}`
    );
  }

  refresh() {
    return this.httpClient.post<AuthData>(`${this.URL}/auth/refresh`, {}).pipe(
      map((res) => {
        return {
          ...res,
          ...this.jwtHelperService.decodeToken(res.access_token),
        };
      })
    );
  }

  isUniqueUsername(username: string) {
    return this.httpClient.get(`${this.URL}/users/user/${username}`)
  }

  setNewUsername(id: number, newLogin: string) {
    return this.httpClient.put<AuthData>(`${this.URL}/users/id/${id}`, { username: newLogin });
  }

  setNewPassword(id: number, newPassword: string) {
    return this.httpClient.put<AuthData>(`${this.URL}/users/id/${id}`, { password: newPassword });
  }
}
