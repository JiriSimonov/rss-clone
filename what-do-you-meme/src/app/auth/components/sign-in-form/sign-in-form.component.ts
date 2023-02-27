import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
  getLoaded,
  getLoading,
  getServerError,
} from '../../store/auth.selectors';
import {login} from '../../store/auth.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  authForm!: FormGroup;
  loading$: Observable<boolean> = this.store$.pipe(select(getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(getLoaded));
  serverError$: Observable<string> = this.store$.pipe(select(getServerError));

  @Input() disabled!: boolean;

  constructor(private store$: Store) {
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  onSubmit(data: { username: string, password: string }) {
    this.store$.dispatch(login(data));
  }

  get loginControl() {
    return this.authForm.get('username');
  }
}
