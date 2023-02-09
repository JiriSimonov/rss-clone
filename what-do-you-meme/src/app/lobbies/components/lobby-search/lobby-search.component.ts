import { LobbyInfo } from './../../models/lobbie-info.model';
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
    });
  }

  get seacrhField() {
    return this.searchForm.get('searсh');
  }

  onSubmit() {
    this.lobbyService
      .getLobbyByName(this.seacrhField?.value)
      .subscribe((data) =>
        // this.lobbyService.lobbies
        console.log(data)
      );
  }

  updateLobbies() {
    this.lobbyService.getAllLobbies().subscribe((lobbies) => {
      this.lobbyService.lobbies = lobbies;
    });
  }
}
