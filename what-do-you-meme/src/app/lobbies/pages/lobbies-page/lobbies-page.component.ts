import { LobbyValidatorsService } from '../../services/lobby-validators/lobby-validators.service';
import { LobbyService } from 'src/app/lobbies/services/lobby/lobby.service';
import { LocalStorageService } from '../../../shared/storage/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { LobbyCreateComponent } from "../../components/lobby-create/lobby-create.component";

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
  private lobbyCreate$ = this.lobbiesService.lobbyCreate();
  private lobbyDelete$ = this.lobbiesService.lobbyDelete();
  private lobbyUpdate$ = this.lobbiesService.lobbyUpdate()
  public isCreatedLobby!: boolean;

  constructor(
    private lobbiesService: LobbyService,
    private localStorage: LocalStorageService,
    private lobbyValidators: LobbyValidatorsService,
    public createDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.lobbyCreate$.subscribe(
      (lobby) => {
        this.lobbiesService.newLobbiesData = lobby;
      }
    );
    this.lobbyDelete$.subscribe(
      (uuid: string) => {
        this.lobbiesService.changeLobbyList(this.lobbiesService.lobbies.filter((lobby) => lobby.uuid !== uuid));
      }
    );
    this.lobbyUpdate$.subscribe(
      (lobby) => {
        const existLobby = this.lobbiesService.lobbies.find((item) => item.uuid === lobby.uuid);
        if (existLobby) Object.assign(existLobby, lobby);
      }
    );
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
