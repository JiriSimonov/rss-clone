import { LobbyValidatorsService } from '../../services/lobby-validators/lobby-validators.service';
import { LobbyModalService } from '../../services/lobby-modal/lobby-modal.service';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LobbyPasswordValidator } from '../../validators/lobby-password-validator';
import { LobbyData } from 'src/app/lobbies/model/lobby-data';
import { Router } from '@angular/router';
import {filter} from "rxjs/operators";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-lobby-join-modal',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.scss'],
})
export class LobbyJoinComponent implements OnInit {
  @Input() lobby?: LobbyData;
  joinForm!: FormGroup;
  private element: HTMLElement;
  private currentId!: string;

  constructor(
    private lobbyModal: LobbyModalService,
    private lobbyModalElem: ElementRef,
    private validatorsService: LobbyValidatorsService,
    private router: Router
  ) {
    this.element = this.lobbyModalElem.nativeElement;
  }

  ngOnInit() {
    this.lobbyModal.currentId$.subscribe((id: string) => {
      this.currentId = id;
    });
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
      filter((value: {passsword: string}) => value.passsword.length > 3)
    ).subscribe();
  }

  onSubmit() {
    this.changeJoinModalState();
    this.router.navigate([`/game/${this.currentId}`], {
      replaceUrl: true,
    }).catch();
  }

  get passwordControl() {
    return this.joinForm.get('password');
  }

  changeJoinModalState() {
    this.lobbyModal.toggleJoinModal();
  }
}
