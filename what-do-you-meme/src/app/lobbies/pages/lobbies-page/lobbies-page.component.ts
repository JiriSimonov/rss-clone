import { LobbyValidatorsService } from '../../services/lobby-validators/lobby-validators.service';
import { LobbyService } from 'src/app/lobbies/services/lobby/lobby.service';
import { LocalStorageService } from '../../../shared/storage/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LobbyCreateComponent} from "../../components/lobby-create/lobby-create.component";

@Component({
  selector: 'app-lobbies-page',
  templateUrl: './lobbies-page.component.html',
  styleUrls: ['./lobbies-page.component.scss'],
})
export class LobbiesPageComponent implements OnInit {
  public scrollUpDistance = 4;
  public scrollDistance = 2;
  public throttle = 0;
  public lobbies$ = this.lobbiesService.lobbies$;
  public isCreatedLobby!: boolean;

  constructor(
    private lobbiesService: LobbyService,
    private localStorage: LocalStorageService,
    private lobbyValidators: LobbyValidatorsService,
    public createDialog: MatDialog,
  ) {}

  ngOnInit() {
    this.checkCreatedLobby();
    this.lobbiesService.resetPrivacy();
    this.lobbiesService.getNewLobbiesList();
  }

  checkCreatedLobby() {
    this.lobbyValidators
      .isUserCreatedLobby(LocalStorageService.username)
      .subscribe((response) => {
        this.isCreatedLobby = response;
        this.localStorage.setItem('createdLobby', response);
      });
  }
  openCreateDialog() {
    this.createDialog.open(LobbyCreateComponent, {
      width: '400px',
    })
  }

  onScrollDown() {
    this.lobbiesService.incrementPage();
    this.lobbiesService.getLobbiesList();
  }

  onScrollUp() {
    this.lobbiesService.decrementPage();
    this.lobbiesService.getLobbiesList();
  }
}
