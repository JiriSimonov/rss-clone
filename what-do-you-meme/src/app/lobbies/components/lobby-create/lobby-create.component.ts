import { LocalStorageService } from 'src/app/shared/storage/services/local-storage/local-storage.service';
import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LobbyService } from '../../services/lobby/lobby.service';
import { LobbyData } from 'src/app/lobbies/model/lobby-data';
import { createLobby } from '../../model/create-lobby';
import { LobbyPasswordValidator } from '../../validators/lobby-name-validator';
import { LobbyValidatorsService } from '../../services/lobby-validators/lobby-validators.service';
import { filter } from "rxjs/operators";
import { debounceTime } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-lobby-modal',
  templateUrl: './lobby-create.component.html',
  styleUrls: ['./lobby-create.component.scss'],
})
export class LobbyCreateComponent implements OnInit {
  modalForm!: FormGroup;

  @Output() onCreated = new EventEmitter<LobbyData>();

  constructor(
    private authService: AuthService,
    private lobbyService: LobbyService,
    private localStorage: LocalStorageService,
    private lobbyValidators: LobbyValidatorsService,
    public createDialog: MatDialog,
  ) {}

  ngOnInit() {
    this.modalForm = new FormGroup({
      maxPlayers: new FormControl('2', [Validators.required]),
      maxRounds: new FormControl('1', [Validators.required]),
      title: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(18),
        ],
        [LobbyPasswordValidator.isUniqueLobbyName(this.lobbyValidators)]
      ),
      private: new FormControl(''),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
      mode: new FormControl('default', []),
      timerDelay: new FormControl('10', [Validators.required])
    });
    this.modalForm.valueChanges.pipe(
      debounceTime(800),
      filter((value: { title: string }) => value.title.length > 3)
    ).subscribe();
  }

  get maxRoundsControlValue() {
    return this.modalForm.get('maxRounds')?.value;
  }

  get maxPlayersControlValue() {
    return this.modalForm.get('maxPlayers')?.value;
  }

  get timerDelayControlValue() {
    return this.modalForm.get('timerDelay')?.value;
  }
  get passwordControl() {
    return this.modalForm.get('password');
  }

  get titleControl() {
    return this.modalForm.get('title');
  }

  get privateControl() {
    return this.modalForm.get('private');
  }

  get modeControlValue() {
    return this.modalForm.get('mode')?.value;
  }

  get LobbyOption() {
    return {
      maxPlayers: this.maxPlayersControlValue,
      maxRounds: this.maxRoundsControlValue,
      title: this.titleControl?.value,
      owner: '',
      image: '',
      mode: this.modeControlValue,
      timerDelay: +this.timerDelayControlValue * 1000,
      password: this.passwordControl?.value,
    };
  }

  onSubmit(data: createLobby) {
    this.authService.userData$.subscribe((user) => {
      if (user.image && user.username) {
        data.image = user.image;
        data.owner = user.username;
        this.createDialog.closeAll();
        this.lobbyService.createLobby(data);
        this.localStorage.setItem('createdLobby', 'true');
      }
    });
  }
}
