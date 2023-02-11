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
import { LobbyOptions } from '../../models/lobbie-info.model';
import { LobbyService } from '../../services/lobby.service';

@Component({
  selector: 'app-lobby-modal',
  templateUrl: './lobby-create-modal.component.html',
  styleUrls: ['./lobby-create-modal.component.scss'],
})
export class LobbyCreateModalComponent implements OnInit {
  modalForm!: FormGroup;
  private element: HTMLElement;

  @Output() onClosed = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<LobbyOptions>();

  constructor(
    private lobbyModalElem: ElementRef,
    private authService: AuthService,
    private lobbyService: LobbyService,
    private lobbyModal: LobbyModalService
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
      maxUsers: new FormControl('2', [Validators.required]),
      rounds: new FormControl('1', [Validators.required]),
      lobbyName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
      ]),
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
    return this.modalForm.get('rounds');
  }

  get passwordControl() {
    return this.modalForm.get('password');
  }

  get maxUsersControl() {
    return this.modalForm.get('maxUsers');
  }

  get nameControl() {
    return this.modalForm.get('lobbyName');
  }

  get privateControl() {
    return this.modalForm.get('private');
  }

  onSubmit(data: LobbyOptions) {
    this.authService.userData$.subscribe((user) => {
      if (user.image && user.username) {
        data.lobbyImage = user.image;
        data.lobbyOwner = user.username;
      }
      data.password = this.passwordControl?.value;
      this.lobbyService.createLobby(data);
      this.lobbyModal.toggleCreateModal();
    });
  }
}
