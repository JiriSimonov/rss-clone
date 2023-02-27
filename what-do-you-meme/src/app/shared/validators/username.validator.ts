import { AuthService } from '../../auth/services/auth.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';

export class UsernameValidator {
  static isUniqueUsername(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return authService.isUniqueUsername(control.value).pipe(
        map((result) => {
          return result ? { isUserExist: true } : null;
        })
      );
    };
  }
}
