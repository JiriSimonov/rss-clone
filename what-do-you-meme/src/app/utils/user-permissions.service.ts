import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {

  isUser$ = of(true);

  constructor() { }
}
