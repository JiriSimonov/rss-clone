import { AuthService } from '../services/auth.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';

export class PasswordValidator {
  static isValidPassword(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return authService.isValidPassword(control.value).pipe(
        map((result) => {
          return Object.values(result).join('') === 'true'
            ? null
            : { isPasswordValid: true };
        })
      );
    };
  }
}
