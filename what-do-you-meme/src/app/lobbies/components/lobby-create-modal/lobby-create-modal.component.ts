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
  playersNumber: number = 2;
  roundsNumber: number = 1;
  lobbyName: string = 'default name';
  modalForm!: FormGroup;
  private element: HTMLElement;

  @Output() onClosed = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<LobbyOptions>();

  constructor(private elem: ElementRef) {
    this.element = this.elem.nativeElement;
  }

  ngOnInit() {
    this.element.addEventListener("click", (e: Event) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        if (target?.classList.contains('modal-create__overlay')) {
          this.onClosed.emit();
        }
      }
    });

    this.modalForm = new FormGroup({
      players: new FormControl('2', [
        Validators.required,
      ]),
      rounds: new FormControl('1', [
        Validators.required,
      ]),
      name: new FormControl('name', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
    })
  }

  get rounds() {
    return this.modalForm.get('rounds');
  }

  get players() {
    return this.modalForm.get('players');
  }

  get name() {
    return this.modalForm.get('name');
  }

  onSubmit(data: LobbyOptions) {
    this.onCreated.emit(data);
  }
}
