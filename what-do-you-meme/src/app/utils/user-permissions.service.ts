import {inject, Injectable} from '@angular/core';
import {map, of} from 'rxjs';
import {Store} from "@ngrx/store";
import {getAuthData} from "../auth/store/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {
  isUser$ = this.store.select(getAuthData).pipe(map(authData => !!authData?.accessToken));

  constructor(private store: Store) {}
}
