import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.scss']
})
export class MemeCardComponent {
  @Input() RotationDegree: number = 0;
  @Input() memeImage: string = 'https://adrenaline.zp.ua/wp-content/uploads/2018/11/1532577152181059880.png'
  @Input() distance: string = '0 0';

  drop() {
    console.log(10);
  }
}
