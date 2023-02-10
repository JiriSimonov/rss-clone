import { LocalStorageService } from './../../../shared/storage/services/local-storage/local-storage.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

import { LobbyOptions } from '../../models/lobbie-info.model';

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
    private router: Router,
    private localStorage: LocalStorageService,
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
    });
  }

  get roundsControl() {
    return this.modalForm.get('rounds');
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
    this.authService.user$.subscribe((user) => {
      data.lobbyImage = user?.image;
      data.lobbyOwner = user?.username;
      data.private = this.privateControl?.value;
      this.localStorage.setItem('createdLobby', 'true');
      this.onCreated.emit(data);
      this.router.navigate([`/game/9`], {replaceUrl: true});
    });
  }
}
