import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigService} from "../config/config.service";

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private avatar$$ = new BehaviorSubject<string>(
    'http://wdym-js-er-sd.onrender.com/public/assets/images/avatars/4.webp'
  );
  public avatar$ = this.avatar$$.asObservable();

  constructor(private httpClient: HttpClient) {}

  getRandomAvatar() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this.httpClient
      .get<string>(
        `${ConfigService.SERVER_URL}/file/random-avatar`,
        requestOptions
      )
      .subscribe((avatar) => {
        this.avatar$$.next(avatar);
      });
  }
}
