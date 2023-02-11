import { LobbyService } from 'src/app/lobbies/services/lobby.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';

export class LobbyPasswordValidator {
  static isValidLobbyPassword(lobbyService: LobbyService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return lobbyService.isValidPassword(control.value).pipe(
        map((result) => {
          return Object.values(result).join('') === 'true'
            ? null
            : { isPasswordValid: true };
        })
      );
    };
  }
}
