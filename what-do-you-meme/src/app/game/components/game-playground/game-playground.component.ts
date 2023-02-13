import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-playground',
  templateUrl: './game-playground.component.html',
  styleUrls: ['./game-playground.component.scss']
})
export class GamePlaygroundComponent implements OnInit {
  roundNumber = 1;

  constructor(public gameService: GameService) { }

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

  drop(event: CdkDragDrop<string[]>) {
    transferArrayItem(
      event.container.data,
      this.gameService.usedMeme,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
