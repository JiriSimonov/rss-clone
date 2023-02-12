import { LobbyModalService } from '../../services/lobby-modal/lobby-modal.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lobby-join-modal',
  templateUrl: './lobby-join-modal.component.html',
  styleUrls: ['./lobby-join-modal.component.scss'],
})
export class LobbyJoinModalComponent implements OnInit {
  joinForm!: FormGroup;
  private element: HTMLElement;

  constructor(
    private lobbyModal: LobbyModalService,
    private lobbyModalElem: ElementRef
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
        this.lobbyModal.toggleJoinModal();
      }
    });
    this.joinForm = new FormGroup({
      password: new FormControl(
        '',
        [Validators.required, Validators.minLength(3)],
        []
      ),
    });
  }

  changeJoinModalState() {
    this.lobbyModal.toggleJoinModal();
  }
}
