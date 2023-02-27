import { AuthService } from '../../auth/services/auth.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';

export class PasswordValidator {
  static isValidPassword(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return authService.isValidPassword(control.value).pipe(
        map((result) => {
          return result ? null : { isPasswordValid: true };
        })
      );
    };
  }
}
