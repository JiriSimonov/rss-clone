import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map, Observable, tap } from 'rxjs';
// import { shuffle } from 'src/app/utils/shuffleArray';
import { ConfigService } from '../../shared/storage/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly Url = `${ConfigService.SERVER_URL}/file/images/meme`
  memes: string[] = [];
  usedMeme: string[] = [];
  players = [];

  constructor(private http: HttpClient, private socket: Socket, private activatedRoute: ActivatedRoute) { }

  getMemes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.Url}`).pipe(
      map(memesArr => {
        return memesArr.map(item => `${this.Url}/${item}`)
      }),
      // tap((memesArr) => this.memes = shuffle(memesArr).slice(0, 5)),
    )
  }

  getLobby() {
    this.socket.emit('getLobbyData', { uuid: this.activatedRoute.snapshot.params['id'] }, (data: any) => {
      this.players = Object.values(data.players);
    });
  }
}