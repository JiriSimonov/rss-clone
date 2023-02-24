import { LobbyValidatorsService } from '../../services/lobby-validators/lobby-validators.service';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LobbyPasswordValidator } from '../../validators/lobby-password-validator';
import { LobbyData } from 'src/app/lobbies/model/lobby-data';
import { Router } from '@angular/router';
import { filter } from "rxjs/operators";
import { debounceTime } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { LobbyService } from "../../services/lobby/lobby.service";

@Component({
  selector: 'app-lobby-join-modal',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.scss'],
})
export class LobbyJoinComponent implements OnInit {
  @Input() lobby?: LobbyData;
  joinForm!: FormGroup;
  private currentId!: string;

  constructor(
    private validatorsService: LobbyValidatorsService,
    private router: Router,
    private lobbyService: LobbyService,
    private joinDialog: MatDialog
  ) { }

  get passwordControl() {
    return this.joinForm.get('password');
  }

  ngOnInit() {
    this.lobbyService.currentId$.subscribe((id: string) => {
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
    this.joinForm.valueChanges.pipe(
      debounceTime(800),
      filter((value: { password: string }) => value.password.length > 3)
    ).subscribe();
  }

  onSubmit() {
    this.joinDialog.closeAll();
    this.router.navigate([`/game/${this.currentId}`], {
      replaceUrl: true,
    }).catch();
  }
}
