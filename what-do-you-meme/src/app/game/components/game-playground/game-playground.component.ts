import { CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { IoInput } from "../../../shared/model/sockets-events";
import { Socket } from "ngx-socket-io";
import { distinctUntilChanged, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrls: ['./game-playground.component.scss']
})
export class GamePlaygroundComponent implements OnDestroy {
  isReady: boolean = false;
  uuid: string;
  playerCards!: string[];
  playerCards$ = this.gameService.playerCards$.pipe(
    tap((cards) => this.playerCards = cards),
  );
  currentRound$ = this.gameService.currentRound$;
  situation$ = this.gameService.situation$;
  usedMemes = this.gameService.usedMeme;
  rotateSubs = new Subscription();

  constructor(private gameService: GameService, activatedRoute: ActivatedRoute, private socket: Socket) {
    this.uuid = activatedRoute.snapshot.params['id'];
  }

  rotateMemeCard(index: number) {
    let deg = 0;
    this.rotateSubs.add(
      this.playerCards$.subscribe(
        ((cards: string[]) => {
          const middleCard = Math.floor(cards.length / 2);
          deg = -(middleCard * 15) + index * 15;
        })
      )
    )
    return deg;
  }

  calcDistance(index: number, arr: string[] | null) {
    if (arr) {
      return `${(Math.ceil(arr.length / 2) * 50) - index * 50}% -100%`
    }

    return '0'
  }

  onDragExited(index: number, fromArr: string[], toArr: string[]) {
    transferArrayItem(
      fromArr,
      toArr,
      index, index);
  }

  pickMemeRequest(uuid: string, meme: string) {
    return this.socket.emit(IoInput.pickMeme, {
      uuid,
      meme,
    });
  }

  ready() {
    this.pickMemeRequest(
      this.uuid,
      this.usedMemes[0],
    );
    this.isReady = true;
  }

  ngOnDestroy() {
    this.rotateSubs.unsubscribe();
  }
}
