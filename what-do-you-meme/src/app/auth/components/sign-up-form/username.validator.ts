import { AbstractControl } from '@angular/forms';
import { tap } from 'rxjs';

export function isUniqueUsernameValidator(this: any, control: AbstractControl, flag?: boolean) {
  return this.isUniqueUsername(control.value).pipe(
    tap((response) => {
      console.log(response);
      flag = !flag;
      return response ? false : true;
    })
  );
}
