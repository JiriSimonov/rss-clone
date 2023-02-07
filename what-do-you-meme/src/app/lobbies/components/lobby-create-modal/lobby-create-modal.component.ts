import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { LobbyOptions } from '../../models/lobbie-info.model';

@Component({
  selector: 'app-lobby-modal',
  templateUrl: './lobby-create-modal.component.html',
  styleUrls: ['./lobby-create-modal.component.scss']
})
export class LobbyCreateModalComponent implements OnInit {
  modalForm!: FormGroup;
  private element: HTMLElement;

  @Output() onClosed = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<LobbyOptions>();

  constructor(private lobbyModalElem: ElementRef) {
    this.element = this.lobbyModalElem.nativeElement;
  }

  ngOnInit() {
    this.element.addEventListener("click", (e: Event) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        if (target?.classList.contains('modal__overlay')) {
          this.onClosed.emit();
        }
      }
    });

    this.modalForm = new FormGroup({
      maxUsers: new FormControl('2', [
        Validators.required,
      ]),
      rounds: new FormControl('1', [
        Validators.required,
      ]),
      lobbyName: new FormControl('lobbyName', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
      ]),
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

  get isAlreadyCreatedLobby() {
    return window.localStorage.getItem('createdLobby') === 'true' ? true : false;
  }

  onSubmit(data: LobbyOptions) {
    window.localStorage.setItem('createdLobby', 'true');
    this.onCreated.emit(data);
  }
}
