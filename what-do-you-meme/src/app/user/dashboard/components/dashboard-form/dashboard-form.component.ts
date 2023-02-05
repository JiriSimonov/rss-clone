import { Router } from '@angular/router';
import { logoutSuccess } from './../../../../auth/store/auth.actions';
import { AuthService } from './../../../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UsernameValidator } from 'src/app/shared/validators/username.validator';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss'],
})
export class DashboardFormComponent implements OnInit {
  changeLoginForm!: FormGroup;
  changePasswordForm!: FormGroup;

  constructor(
    private store$: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changeLoginForm = new FormGroup({
      login: new FormControl(
        '',
        [Validators.required, Validators.minLength(4)],
        [UsernameValidator.isUniqueUsername(this.authService)]
      ),
    });
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  deleteUser() {
    this.authService
      .deleteUser(this.getUserSub())
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              console.log('404 NOT FOUND');
              return EMPTY;
            }
          }
          throw err;
        })
      )
      .subscribe(() => {
        this.store$.dispatch(logoutSuccess());
        localStorage.clear();
        this.router.navigate(['auth'], { replaceUrl: true });
      });
  }

  get usernameControl() {
    return this.changeLoginForm.get('login');
  }

  get passwordControl() {
    return this.changePasswordForm.get('password');
  }

  get confirmPasswordControl() {
    return this.changePasswordForm.get('confirmPassword');
  }

  getUserSub() {
    let userSub;
    this.authService.user$.subscribe((data) => (userSub = data?.sub));
    return userSub ? userSub : 6;
  }

  onSubmitChangeLogin() {
    this.getUserSub();
    this.authService
      .setNewUsername(this.getUserSub(), this.usernameControl?.value)
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              console.log('404 NOT FOUND');
              return EMPTY;
            }
          }
          throw err;
        })
      )
      .subscribe(() => {
        this.store$.dispatch(logoutSuccess());
        localStorage.clear();
        this.router.navigate(['auth'], { replaceUrl: true });
      });
  }

  onSubmitChangePassword() {
    this.getUserSub();
    this.authService
      .setNewPassword(this.getUserSub(), this.confirmPasswordControl?.value)
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              console.log('404 NOT FOUND');
              return EMPTY;
            }
          }
          throw err;
        })
      )
      .subscribe(() => {
        this.store$.dispatch(logoutSuccess());
        localStorage.clear();
        this.router.navigate(['auth'], { replaceUrl: true });
      });
  }
}
