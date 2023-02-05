import { AuthService } from '../../auth/services/auth.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';

export class UsernameValidator {
  static isValidPassword(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return authService.isValidPassword(control.value).pipe(
        map((result) => {
          return Object.values(result).join('') === 'true'
            ? { isPasswordValid: true }
            : null;
        })
      );
    };
  }
}
