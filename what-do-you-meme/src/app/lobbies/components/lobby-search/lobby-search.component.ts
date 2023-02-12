import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LobbyService } from '../../services/lobby.service';

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
      searсh: new FormControl('', [Validators.minLength(3)], []),
      private: new FormControl(),
    });
  }

  get searchField() {
    return this.searchForm.get('searсh');
  }

  get privateField() {
    return this.searchForm.get('private');
  }

  get privateFieldBooleanValue() {
    return this.privateField?.value === 'false' ? false : true;
  }

  onSubmit() {
    if (this.privateField?.value === '') {
      this.lobbyService.getLobbiesList({
        chunk: { page: 0, limit: this.lobbyService.chunkOptions.limit },
        nameContains: this.searchField?.value,
      });
    } else {
      this.lobbyService.getLobbiesList({
        chunk: { page: 0, limit: this.lobbyService.chunkOptions.limit },
        isPrivate: this.privateFieldBooleanValue,
        nameContains: this.searchField?.value,
      });
    }
  }

  updateLobbies() {
    this.onSubmit()
  }
}
