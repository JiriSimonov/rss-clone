import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LobbyService } from '../../services/lobby/lobby.service';

@Component({
  selector: 'app-lobby-search',
  templateUrl: './lobby-search.component.html',
  styleUrls: ['./lobby-search.component.scss'],
})
export class LobbySearchComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private lobbyService: LobbyService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.minLength(3)], []),
      private: new FormControl(),
    });
  }

  get searchFieldValue() {
    return this.searchForm.get('search')?.value;
  }

  get privateFieldValue() {
    return this.searchForm.get('private')?.value;
  }

  getLobbies() {
    this.lobbyService.resetPage();
    this.lobbyService.changePrivate(this.privateFieldValue ?? '');
    this.lobbyService.changeNameContains(this.searchFieldValue);
    this.lobbyService.getNewLobbiesList();
  }

  updateLobbies() {
    this.getLobbies();
  }
}
