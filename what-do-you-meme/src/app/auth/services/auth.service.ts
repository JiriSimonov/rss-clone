import { AuthData } from './../store/auth.reducer';
import { getAuthData } from './../store/auth.selectors';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {UserData} from "../models/user-data.model";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$ = this.store.select(getAuthData);

  constructor(private httpClient: HttpClient, private store: Store) { }

  login(body: {username: string, password: string}) {
    return this.httpClient.post<AuthData>('https://dummyjson.com/auth/login', body).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }

  signUp(body: {login: string, password: string}) {
    return this.httpClient.post<{login: string, password: string}>('https://wdym-js-er-sd.onrender.com/users/create', body);
  }

  getUserById(id: number) {
    return this.httpClient.get<{login: string, password: string}>(`https://wdym-server.up.railway.app/users/id/${id}`);
  }
}
