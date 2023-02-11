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
    // this.lobbyService
    //   .getLobby(this.seacrhField?.value)
    //   .subscribe((data) =>
    //     // this.lobbyService.lobbies
    //     console.log(data)
    //   );
  }

  async updateLobbies() {
    const lobbies: any = await this.lobbyService.getLobbiesList({});
    this.lobbyService.lobbies = lobbies;
  }
}
