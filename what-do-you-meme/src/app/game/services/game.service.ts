import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly Url = 'https://wdym-js-er-sd.onrender.com/file/images/meme'
  memes: string[] = [
    `${this.Url}/trawolta`,
    `${this.Url}/trawolta`,
    `${this.Url}/trawolta`,
    `${this.Url}/trawolta`,
    `${this.Url}/trawolta`,
  ]

  constructor(private http: HttpClient) { }

  getMemes(): Observable<string> {
    return this.http.get<string>(`${this.Url}`);
  }

  getMeme(name: string) {
    return this.http.get<any>(`${this.Url}/${name}`).pipe(map(response => response.json()));
  }
}
