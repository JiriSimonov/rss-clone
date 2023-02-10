import { LobbyModalService } from './../../services/lobby-modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyInfo } from '../../models/lobbie-info.model';

@Component({
  selector: 'app-lobby-info',
  templateUrl: './lobby-info.component.html',
  styleUrls: ['./lobby-info.component.scss']
})
export class LobbyInfoComponent implements OnInit {
  @Input() lobby?: LobbyInfo;


  constructor(private router: Router, private lobbyModal: LobbyModalService) {
  }

  ngOnInit(): void {
    
  }

  checkPrivate() {
    if (this.lobby?.private) {
    this.lobbyModal.toggleJoinModal();      
    } else {
      this.router.navigate([`/game/${this.lobby?.id}`], {replaceUrl: true});
    }
  }
}
