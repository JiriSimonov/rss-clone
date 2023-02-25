import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { IoInput, IoOutput } from 'src/app/shared/model/sockets-events';
import { GameCurrentData } from '../models/game.model';
import { ConfigService } from "../../shared/services/config/config.service";
import { map } from "rxjs/operators";

const initialGameState: GameCurrentData = {
  changePhaseDate: 0,
  mode: '',
  situation: '',
  situationOptions: [''],
  situations: {},
  currentRound: 0,
  memes: {
    '': ['']
  },
  players: [],
  phase: 'prepare',
  votes: {}
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly URL = ConfigService.SERVER_URL;
  usedMeme: string[] = [];
  private gameData$$ = new BehaviorSubject<GameCurrentData>(initialGameState);
  public gameData$ = this.gameData$$.asObservable();
  public players$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.players
    }),
    distinctUntilChanged(),
  );
  public memes$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.memes;
    }),
    distinctUntilChanged()
  );
  public votes$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.votes;
    }),
    distinctUntilChanged()
  );
  public currentRound$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.currentRound;
    }),
    distinctUntilChanged()
  );
  public situation$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.situation;
    })
  );
  public phase$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.phase;
    }),
    distinctUntilChanged()
  );
  public situationOptions$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.situationOptions;
    }),
  )
  public situations$ = this.gameData$.pipe(
    map((gameData: GameCurrentData) => {
      return gameData.situations;
    }),
  )

  private playerCards$$ = new BehaviorSubject<string[]>([])
  public playerCards$ = this.playerCards$$.asObservable();
  constructor(private http: HttpClient, private socket: Socket) { }

  changeGameData(newData: GameCurrentData) {
    this.gameData$$.next(newData);
  }

  clearUsedMemes() {
    this.usedMeme.length = 0;
  }

  isLobbyOwner(username: string, uuid: string) {
    return this.http.get<boolean>(`${this.URL}/lobbies/is-lobby-owner`, {
      params: { username, uuid }
    });
  }

  getPlayerCards() {
    this.http.get<string[]>(`${ConfigService.SERVER_URL}/file/images/meme`, {
      params: {
        quantity: 5,
        shuffle: true
      }
    }).subscribe(
      (playerCards) => this.playerCards$$.next(playerCards)
    )
  }

  sendVote(uuid: string, vote: string) {
    this.socket.emit(IoInput.getVote, {
      uuid,
      vote,
    });
  }

  pickSituationEvent() {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.pickSituation);
  }
}
