import { LobbyState } from './../../models/lobbie-info.model';
import { LobbyModalService } from '../../services/lobby-modal/lobby-modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby-info',
  templateUrl: './lobby-info.component.html',
  styleUrls: ['./lobby-info.component.scss']
})
export class LobbyInfoComponent implements OnInit {
  @Input() lobby?: LobbyState;

  currentUsers: number = Object.values(this.lobby?.players ?? '').length
// TODO переписать

  constructor(private router: Router, private lobbyModal: LobbyModalService) {
  }

  ngOnInit(): void {
    
  }

  get isPrivate() {
    return this.lobby?.password;
  }

  checkPrivate() {
    if (this.isPrivate) {
    this.lobbyModal.toggleJoinModal();      
    } else {
      this.router.navigate([`/game/${this.lobby?.uuid}`], {replaceUrl: true});
    }
  }
}
