import {AuthData} from '../store/auth.reducer';
import {getAuthData} from '../store/auth.selectors';
import {Store} from '@ngrx/store';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {distinctUntilChanged, map} from 'rxjs';
import {ConfigService} from "../../shared/services/config/config.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = ConfigService.SERVER_URL;
  public user$ = this.store$.select(getAuthData);
  public username$ = this.user$.pipe(
    map((userData: AuthData | null | undefined) => {
      return userData?.username;
    }),
    distinctUntilChanged()
  )
  public userData$ = this.user$.pipe(
    map((userData) => {
      return {
        owner: userData?.username,
        image: userData?.image
      }
    }),
    distinctUntilChanged()
  );

  constructor(
    private http: HttpClient,
    private store$: Store,
    private jwtHelperService: JwtHelperService
  ) {
  }

  login(body: { username: string; password: string }) {
    return this.http.post<AuthData>(`${this.URL}/auth/login`, body).pipe(
      map((res) => {
        return {
          ...res,
          ...this.jwtHelperService.decodeToken(res.access_token),
        };
      })
    );
  }

  signUp(body: { username: string; password: string; image: string }) {
    return this.http.post<{ username: string; password: string }>(
      `${this.URL}/users`,
      body
    );
  }

  refresh() {
    return this.http.post<AuthData>(`${this.URL}/auth/refresh`, {}).pipe(
      map((res) => {
        return {
          ...res,
          ...this.jwtHelperService.decodeToken(res.access_token),
        };
      })
    );
  }

  isUniqueUsername(username: string) {
    return this.http.get<boolean>(`${this.URL}/users/has`, {
      params: {
        username
      }
    });
  }

  isValidPassword(password: string) {
    return this.http.post<AuthData>(`${this.URL}/auth/validate`, {
      password,
    });
  }

  deleteUser() {
    return this.http.delete<AuthData>(`${this.URL}/users/`);
  }

  changeUserData(userData: Partial<AuthData>) {
    return this.http.patch<AuthData>(`${this.URL}/users/`, userData);
  }
}
