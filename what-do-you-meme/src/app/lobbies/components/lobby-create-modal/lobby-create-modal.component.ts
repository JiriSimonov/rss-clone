import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { LobbyOptions } from '../../models/lobbie-info.model';

@Component({
  selector: 'app-lobby-modal',
  templateUrl: './lobby-create-modal.component.html',
  styleUrls: ['./lobby-create-modal.component.scss']
})
export class LobbyCreateModalComponent implements OnInit {
  playersNumber: number = 2;
  roundsNumber: number = 1;
  private element: HTMLElement;

  @Output() onClosed = new EventEmitter<boolean>();
  @Output() onCreated = new EventEmitter<LobbyOptions>();

  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement;
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
  }

  createLobby(data: LobbyOptions) {
    console.log(data);
    this.onCreated.emit(data);
  }
}
