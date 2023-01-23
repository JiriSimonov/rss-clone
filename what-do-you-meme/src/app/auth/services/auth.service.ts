import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(body: {login: string, password: string}) {
    return this.httpClient.post<{accessToken: string}>('https://b00c1781-1b78-4641-8d0b-d0770896a909.mock.pstmn.io', body);
  }
}
