import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { ConfigService } from '../storage/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class UserAvatarService {
  public images = '';
  constructor(private httpClient: HttpClient) {}

  getRandomAvatar() {
    this.httpClient
      .get(`${ConfigService.SERVER_URL}/file/random-avatar`)
      .subscribe((image: any) => {
        console.log(image);
      });
  }
}
