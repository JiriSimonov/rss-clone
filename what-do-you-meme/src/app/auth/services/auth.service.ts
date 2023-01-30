import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(body: {username: string, password: string}) {
    return this.httpClient.post<{accessToken: string}>('https://dummyjson.com/auth/login', body).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }
}
