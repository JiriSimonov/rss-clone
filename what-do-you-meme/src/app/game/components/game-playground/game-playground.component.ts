import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrls: ['./game-playground.component.scss']
})
export class GamePlaygroundComponent implements OnInit {
  isReady: boolean = false;
  gameId: string;

  constructor(public gameService: GameService, activatedRoute: ActivatedRoute) {
    this.gameId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.gameService.getMemes();
  }

  rotateMemeCard(index: number, arr: string[] = this.gameService.memes) {
    const middleCard = Math.floor(arr.length / 2);
    return -(middleCard * 15) + index * 15;
  }

  calcDistance(index: number, arr: string[] = this.gameService.memes) {
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
