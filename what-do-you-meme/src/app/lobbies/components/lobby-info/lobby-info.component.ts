import { Component, Input } from '@angular/core';
import { LobbyInfo } from '../../models/lobbie-info.model';

@Component({
  selector: 'app-lobby-info',
  templateUrl: './lobby-info.component.html',
  styleUrls: ['./lobby-info.component.scss']
})
export class LobbyInfoComponent {
  @Input() lobby: LobbyInfo = {totalUsers: 2, rounds: 3, joinedUsers: 1};

  constructor() {}
}
