import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LobbyModalService {
  public isOpenCreateModal: boolean = false;
  public isOpenJoinModal: boolean = false;
  private currentId$$ = new BehaviorSubject<string>('');
  public currentId$ = this.currentId$$.asObservable();

  constructor() {}

  currentLobbyId(uuid: string) {
    this.currentId$$.next(uuid);
  }

  toggleCreateModal() {
    this.isOpenCreateModal = !this.isOpenCreateModal;
  }
  
  toggleJoinModal() {
    this.isOpenJoinModal = !this.isOpenJoinModal;
  }
}
