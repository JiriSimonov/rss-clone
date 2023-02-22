import { transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrls: ['./game-playground.component.scss']
})
export class GamePlaygroundComponent {
  isReady: boolean = false;
  gameId: string;
  playerCards!: string[]
  playerCards$ = this.gameService.playerCards$.pipe(
    tap((arr) => this.playerCards = arr)
  );
  currentRound$ = this.gameService.currentRound$;
  rounds$ = this.gameService.rounds$;
  constructor(public gameService: GameService, activatedRoute: ActivatedRoute) {
    this.gameId = activatedRoute.snapshot.params['id'];
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

  calcDistance(index: number, arr: string[] = this.playerCards) {
    return `${(Math.ceil(arr.length / 2) * 50) - index * 50}% -100%`
  }

  onDragExited(index: number, fromArr: string[], toArr: string[]) {
      transferArrayItem(
        fromArr,
        toArr,
        index, index);
  }

  ready() {
    this.gameService.pickMemeRequest(
      this.gameId,
    );
    this.isReady = true;
  }
}
