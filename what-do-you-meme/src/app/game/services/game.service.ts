import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {BehaviorSubject, distinctUntilChanged, Observable} from 'rxjs';
import { IoInput, IoOutput } from 'src/app/shared/model/sockets-events';
import { GameCurrentData } from '../models/game.model';
import {ConfigService} from "../../shared/services/config/config.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly URL = ConfigService.SERVER_URL;
  memes: string[] = [];
  usedMeme: string[] = [];
  private gameData$$ = new BehaviorSubject<GameCurrentData | null>(null);
  public gameData$ = this.gameData$$.asObservable();
  public players$ = this.gameData$.pipe(
    map((gameData: GameCurrentData | null) => {
      return Object.values(gameData?.players ?? []);
    }),
    distinctUntilChanged()
  );
  public memes$ = this.gameData$.pipe(
    map((gameData: GameCurrentData | null) => {
      return gameData?.memes;
    }),
    distinctUntilChanged()
  );
  public votes$ = this.gameData$.pipe(
    map((gameData: GameCurrentData | null) => {
      console.log(gameData?.votes, 'в сервисе при пайпе')
      return gameData?.votes;
    }),
    distinctUntilChanged()
  );
  public currentRound$ = this.gameData$.pipe(
    map((gameData: GameCurrentData | null) => {
      return gameData?.currentRound;
    }),
    distinctUntilChanged()
  );
  public rounds$ = this.gameData$.pipe(
    map((gameData: GameCurrentData | null) => {
      return gameData?.rounds.slice(-1);
    })
  );
  private playerCards$$ = new BehaviorSubject<string[]>([])
  public playerCards$ = this.playerCards$$.asObservable();
  constructor(private http: HttpClient, private socket: Socket) { }

  changeGameData(newData: GameCurrentData) {
    this.memes$.subscribe((item) => console.log(item))
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
    this.socket.emit(IoInput.randomMemesRequest, { quantity: 5 }, (memesList: string[]) => {
      console.log(memesList)
      this.playerCards$$.next(memesList);
    });
  }

  joinLobbyRequest(uuid: string) {
    this.socket.emit(IoInput.joinLobbyRequest, {
      uuid,
      password: '',
    }, (gameData: GameCurrentData) => {
      console.log(gameData);
      this.gameData$$.next(gameData);
    });
  }

  leaveLobbyRequest(uuid: string) {
    return this.socket.emit(IoInput.leaveLobbyRequest, { uuid });
  }

  pickMemeRequest(uuid: string, meme: string = this.usedMeme[0]) {
    return this.socket.emit(IoInput.pickMeme, {
      uuid,
      meme,
    });
  }

  sendVote(uuid: string, vote: string) {
    this.socket.emit(IoInput.getVote, {
      uuid,
      vote,
    })
  }

  startGameRequest(uuid: string) {
    this.socket.emit(IoInput.startGame, uuid);
  }

  forceChangePhaseRequest(uuid: string) {
    this.socket.emit(IoInput.forcedChangePhase, uuid);
  }

  joinLobbyEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.joinLobby);
  }

  leaveLobbyEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.leaveLobby);
  }

  changePhaseEvent(): Observable<GameCurrentData> {
    return this.socket.fromEvent<GameCurrentData>(IoOutput.changePhase);
  }

  errorSocketEvent() {
    return this.socket.fromEvent('error');
  }
}
