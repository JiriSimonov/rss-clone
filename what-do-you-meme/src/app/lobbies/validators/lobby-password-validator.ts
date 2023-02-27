import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs';
import {LobbyValidatorsService} from '../services/lobby-validators/lobby-validators.service';

export class LobbyPasswordValidator {
  static isValidPassword(
    validation: LobbyValidatorsService,
    uuid: string
  ): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return validation.isCorrectLobbyPassword(uuid, control.value).pipe(
        map((result) => {
          return result ? null : {isPasswordValid: true};
        })
      );
    };
  }
}
