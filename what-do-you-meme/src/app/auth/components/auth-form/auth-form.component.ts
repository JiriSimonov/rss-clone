import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {getLoaded, getLoading, getServerError} from "../../store/auth.selectors";
import {login} from "../../store/auth.actions";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit{
  loading$: Observable<boolean> = this.store$.pipe(select(getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(getLoaded));
  serverError$: Observable<string> = this.store$.pipe(select(getServerError));
  serverError = '';

  constructor(private store$: Store) {
  }
  ngOnInit(): void {
  }

  onLogin(loginPayload: {login: string, password: string}) {
    console.log('OnLogin', loginPayload);
    this.store$.dispatch(login(loginPayload))
    this.serverError += 'F';
    console.warn(loginPayload)
  }
}
