import { isAuth } from '../auth/store/auth.selectors';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionsService {

  public isUser$ = this.store$.select(isAuth).pipe(
    map((auth) => {
      return auth
    })
  );

  constructor(private store$: Store) {}
}
