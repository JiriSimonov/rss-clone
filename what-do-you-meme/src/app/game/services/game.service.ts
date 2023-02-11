import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly Url = 'https://wdym-js-er-sd.onrender.com/file/images/meme'
  memes: string[] = [];
  usedMeme: string[] = [];

  constructor(private http: HttpClient) { }

  getMemes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.Url}`).pipe(
      map(memesArr => {
        return memesArr.map(item => `${this.Url}/${item}`)
      }),
      tap((memesArr) => this.memes = [...memesArr.slice(0, 5)]),
    )
  }

  shuffleArr(arr: string[]) {

  }
}
