import { Component, Input, OnInit } from '@angular/core';
import { LobbyInfo } from '../../models/lobbie-info.model';

@Component({
  selector: 'app-lobby-info',
  templateUrl: './lobby-info.component.html',
  styleUrls: ['./lobby-info.component.scss']
})
export class LobbyInfoComponent implements OnInit {
  @Input() lobby?: LobbyInfo;

  gameLink?: string;

  constructor() {
  }

  ngOnInit(): void {
    this.gameLink = `/game/${this.lobby?.id}`;
  }
}
