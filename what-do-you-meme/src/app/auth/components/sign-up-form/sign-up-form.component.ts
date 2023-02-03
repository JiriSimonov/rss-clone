import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { UserData } from './../../models/user-data.model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EMPTY } from 'rxjs';
import { isUniqueUsernameValidator } from './username.validator';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  signUpForm!: FormGroup;
  errors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ], [isUniqueUsernameValidator.bind(this.authService)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  get userData(): UserData {
    return {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
    };
  }

  onSubmit() {
    this.authService
      .signUp(this.userData)
      .pipe(
        catchError((error) => {
          this.errors.push(error.message);
          this.cdr.detectChanges();
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigate(['lobbies'], { replaceUrl: true });
      });
  }

  get isPasswordEqual(): boolean {
    return (
      this.signUpForm.value.password === this.signUpForm.value.confirmPassword
    );
  }

  get isFormValid(): boolean {
    return this.signUpForm.valid && this.signUpForm.dirty;
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get passwordControl() {
    return this.signUpForm.get('password');
  }

  get passwordConfirmControl() {
    return this.signUpForm.get('confirmPassword');
  }
}
