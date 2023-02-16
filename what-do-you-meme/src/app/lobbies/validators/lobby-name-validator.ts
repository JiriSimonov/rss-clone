import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { LobbyValidatorsService } from '../services/lobby-validators/lobby-validators.service';

export class LobbyPasswordValidator {
  static isUniqueLobbyName(validation: LobbyValidatorsService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return validation.isUniqueLobbyName(control.value).pipe(
        map((result) => {
          return result ? null : { isLobbyNameUnique: true };
        })
      );
    };
  }
}
