import { LocalStorageService } from 'src/app/shared/storage/services/local-storage/local-storage.service';
import { LobbyModalService } from './../../services/lobby-modal/lobby-modal.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LobbyService } from '../../services/lobby.service';
import { LobbyData } from 'src/app/shared/model/lobby-data';
import { createLobby } from '../../model/create-lobby';
import { LobbyPasswordValidator } from '../../validators/lobby-name-validator';
import { LobbyValidatorsService } from '../../services/lobby-validators/lobby-validators.service';

@Component({
  selector: 'app-lobby-modal',
  templateUrl: './lobby-create-modal.component.html',
  styleUrls: ['./lobby-create-modal.component.scss'],
})
export class LobbyCreateModalComponent implements OnInit {
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
    private lobbyValidators: LobbyValidatorsService,
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
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
      ], [LobbyPasswordValidator.isUniqueLobbyName(this.lobbyValidators)]),
      private: new FormControl(''),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
    });
  }

  get isPrivate() {
    return this.privateControl?.value;
  }

  get roundsControl() {
    return this.modalForm.get('maxRounds');
  }

  get passwordControl() {
    return this.modalForm.get('password');
  }

  get maxUsersControl() {
    return this.modalForm.get('maxPlayers');
  }

  get nameControl() {
    return this.modalForm.get('title');
  }

  get privateControl() {
    return this.modalForm.get('private');
  }

  onSubmit(data: createLobby) {
    this.authService.userData$.subscribe((user) => {
      if (user.image && user.username) {
        data.image = user.image;
        data.owner = user.username;
      }
      data.title = this.nameControl?.value;
      delete data.private;
      data.password = this.passwordControl?.value;
      this.lobbyService.createLobby(data);
      this.lobbyModal.toggleCreateModal();
      this.localStorage.setItem('createdLobby', 'true');
    });
  }
}
