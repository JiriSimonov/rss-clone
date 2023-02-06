import { Router } from '@angular/router';
import { logoutSuccess } from './../../../../auth/store/auth.actions';
import { AuthService } from './../../../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UsernameValidator } from 'src/app/shared/validators/username.validator';
import { UserData } from 'src/app/auth/models/user-data.model';
import { PasswordValidator } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss'],
})
export class DashboardFormComponent implements OnInit {
  changeUserDataForm!: FormGroup;

  constructor(
    private store$: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changeUserDataForm = new FormGroup({
      login: new FormControl(
        '',
        [Validators.minLength(4), Validators.maxLength(12)],
        [UsernameValidator.isUniqueUsername(this.authService)]
      ),
      password: new FormControl(
        '',
        [
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.required,
        ],
        [PasswordValidator.isValidPassword(this.authService)]
      ),
      confirmPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  isFormValid() {
    return !(this.usernameControl?.value !== ''  || this.confirmPasswordControl?.value !== '');
  }

  get usernameControl() {
    return this.changeUserDataForm.get('login');
  }

  get passwordControl() {
    return this.changeUserDataForm.get('password');
  }

  get confirmPasswordControl() {
    return this.changeUserDataForm.get('confirmPassword');
  }

  deleteUser() {
    this.authService
      .deleteUser()
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

  changeUserData() {
    const userData: Partial<UserData> = {};
    if (this.usernameControl!.value) {
      userData.username = this.usernameControl!.value;
    }
    if (this.confirmPasswordControl!.value) {
      userData.password = this.confirmPasswordControl!.value;
    }
    this.authService
      .changeUserData(userData)
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
