import {LocalStorageService} from 'src/app/shared/storage/services/local-storage/local-storage.service';
import {LobbyModalService} from '../../services/lobby-modal/lobby-modal.service';
import {Component, ElementRef, EventEmitter, OnInit, Output,} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/auth/services/auth.service';
import {LobbyService} from '../../services/lobby/lobby.service';
import {LobbyData} from 'src/app/lobbies/model/lobby-data';
import {createLobby} from '../../model/create-lobby';
import {LobbyPasswordValidator} from '../../validators/lobby-name-validator';
import {LobbyValidatorsService} from '../../services/lobby-validators/lobby-validators.service';
import {filter} from "rxjs/operators";
import {debounceTime} from "rxjs";
import {LobbyMode} from "../../../shared/model/lobbyMode";

@Component({
  selector: 'app-lobby-modal',
  templateUrl: './lobby-create.component.html',
  styleUrls: ['./lobby-create.component.scss'],
})
export class LobbyCreateComponent implements OnInit {
  modalForm!: FormGroup;
  private element: HTMLElement;

  @Output() onClosed = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<LobbyData>();

  constructor(
    private lobbyModalElem: ElementRef,
    private authService: AuthService,
    private lobbyService: LobbyService,
    private lobbyModal: LobbyModalService,
    private localStorage: LocalStorageService,
    private lobbyValidators: LobbyValidatorsService
  ) {
    this.element = this.lobbyModalElem.nativeElement;
  }

  ngOnInit() {
    this.element.addEventListener('click', (e: Event) => {
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target?.classList.contains('modal__overlay')
      ) {
        this.onClosed.emit();
      }
    });

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
      mode: new FormControl('', [])
    });
    this.modalForm.valueChanges.pipe(
      debounceTime(800),
      filter((value: {title: string}) => value.title.length > 3)
    ).subscribe();
  }

  get maxRoundsControl() {
    return this.modalForm.get('maxRounds');
  }

  get passwordControl() {
    return this.modalForm.get('password');
  }

  get maxPlayersControl() {
    return this.modalForm.get('maxPlayers');
  }

  get titleControl() {
    return this.modalForm.get('title');
  }

  get privateControl() {
    return this.modalForm.get('private');
  }

  formatToEnumValues(value: string) {
    if (value === '') return LobbyMode.default;
    return value === 'true' ? LobbyMode.giphy : LobbyMode.tv;
  }

  get lobbyMode() {
    return this.modalForm.get('mode')?.value;
  }

  get LobbyOption() {
    return {
      maxPlayers: this.maxPlayersControl?.value,
      maxRounds: this.maxRoundsControl?.value,
      title: this.titleControl?.value,
      owner: '',
      image: '',
      mode: this.formatToEnumValues(this.lobbyMode),
      password: this.passwordControl?.value,
    };
  }

  onSubmit(data: createLobby) {
    this.authService.userData$.subscribe((user) => {
      if (user.image && user.username) {
        data.image = user.image;
        data.owner = user.username;
        this.lobbyService.createLobby(data);
        this.lobbyModal.toggleCreateModal();
        this.localStorage.setItem('createdLobby', 'true');
      }
    });
  }
}
