import { transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import {tap} from "rxjs/operators";
import {IoInput} from "../../../shared/model/sockets-events";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrls: ['./game-playground.component.scss']
})
export class GamePlaygroundComponent {
  isReady: boolean = false;
  uuid: string;
  playerCards!: string[]
  playerCards$ = this.gameService.playerCards$.pipe(
    tap((arr) => this.playerCards = arr)
  );
  currentRound$ = this.gameService.currentRound$;
  rounds$ = this.gameService.rounds$;
  constructor(public gameService: GameService, activatedRoute: ActivatedRoute, private socket: Socket) {
    this.uuid = activatedRoute.snapshot.params['id'];
  }

  rotateMemeCard(index: number) {
    let deg = 0;
    this.playerCards$.subscribe(
    ((cards: string[]) => {
      const middleCard = Math.floor(cards.length / 2);
      deg = -(middleCard * 15) + index * 15;
      })
    )
    return deg;
  }

  calcDistance(index: number, arr: string[]) {
    return `${(Math.ceil(arr.length / 2) * 50) - index * 50}% -100%`
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
      this.gameService.usedMeme[0]
    );
    this.isReady = true;
  }
}
