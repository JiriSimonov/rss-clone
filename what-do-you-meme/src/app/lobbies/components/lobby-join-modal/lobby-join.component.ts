import { LobbyValidatorsService } from '../../services/lobby-validators/lobby-validators.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LobbyPasswordValidator } from '../../validators/lobby-password-validator';
import { LobbyData } from 'src/app/lobbies/model/lobby-data';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { LobbyService } from "../../services/lobby/lobby.service";

@Component({
  selector: 'app-lobby-join-modal',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.scss'],
})
export class LobbyJoinComponent implements OnInit {
  @Input() lobby?: LobbyData;
  public joinForm!: FormGroup;
  private currentId!: string;

  constructor(
    private validatorsService: LobbyValidatorsService,
    private router: Router,
    private lobbyService: LobbyService,
    private joinDialog: MatDialog,
  ) {
  }

  get passwordControl() {
    return this.joinForm.get('password');
  }

  ngOnInit() {
    this.lobbyService.currentUUID$.subscribe((id: string) => {
      this.currentId = id;
    });
    this.joinForm = new FormGroup({
      password: new FormControl(
        '',
        [Validators.required, Validators.minLength(3)],
        [
          LobbyPasswordValidator.isValidPassword(
            this.validatorsService,
            this.currentId
          ),
        ]
      ),
    });
  }

  onSubmit() {
    this.joinDialog.closeAll();
    this.lobbyService.joinLobby(this.lobbyService.getLobbyByUUID(this.currentId), this.passwordControl?.value);
  }
}
