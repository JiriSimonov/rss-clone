import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { filter, map } from 'rxjs';

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
      maxUsers: new FormControl('2', [
        Validators.required,
      ]),
      rounds: new FormControl('1', [
        Validators.required,
      ]),
      name: new FormControl('name', [
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
    return this.modalForm.get('name');
  }

  get alreadyCreated() {
    return window.localStorage.getItem('createdRoom') === 'true' ? true : false;
  }

  onSubmit(data: LobbyOptions) {
    window.localStorage.setItem('createdRoom', 'true');
    this.onCreated.emit(data);
  }
}
