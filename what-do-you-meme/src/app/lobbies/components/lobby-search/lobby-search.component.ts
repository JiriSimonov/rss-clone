import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LobbyService } from '../../services/lobby/lobby.service';
import {debounceTime} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-lobby-search',
  templateUrl: './lobby-search.component.html',
  styleUrls: ['./lobby-search.component.scss'],
})
export class LobbySearchComponent implements OnInit {
  public searchForm!: FormGroup;

  constructor(private lobbyService: LobbyService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.minLength(3)], []),
      private: new FormControl('all'),
    });
    this.searchForm.valueChanges.pipe(
      debounceTime(800),
      filter((value: { search: string, private: string }) => value.search.length > 2),
    ).subscribe()
  }

  get searchFieldValue() {
    return this.searchForm.get('search')?.value;
  }

  get privateFieldValue() {
    return this.searchForm.get('private')?.value;
  }

  getLobbies() {
    this.lobbyService.resetPage();
    this.lobbyService.changePrivacy(this.privateFieldValue ?? 'all');
    this.lobbyService.changeNameContains(this.searchFieldValue);
    this.lobbyService.getNewLobbiesList();
  }
}
