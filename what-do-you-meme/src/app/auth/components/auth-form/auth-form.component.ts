import {Component, OnInit, Input} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {getLoaded, getLoading, getServerError} from "../../store/auth.selectors";
import {login} from "../../store/auth.actions";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  authForm!: FormGroup;
  loading$: Observable<boolean> = this.store$.pipe(select(getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(getLoaded));
  serverError$: Observable<string> = this.store$.pipe(select(getServerError));
  serverError = '';

  @Input() disabled!: boolean;

  constructor(private store$: Store) {
  }

  ngOnInit(): void {
    this.authForm = new FormGroup(
      {
        'login': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'password': new FormControl('', [Validators.required]),
      }
    )
  }

  onSubmit() {
    const loginPayload = this.authForm.value;
    console.log('OnLogin', loginPayload);
    this.store$.dispatch(login(loginPayload))
    this.serverError += 'F';
  }

  get loginControl() {
    return this.authForm.get('login');
  }
}
