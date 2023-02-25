import {Router} from '@angular/router';
import {logoutSuccess} from '../../../../auth/store/auth.actions';
import {AuthService} from '../../../../auth/services/auth.service';
import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsernameValidator} from 'src/app/shared/validators/username.validator';
import {UserData} from 'src/app/auth/models/user-data.model';
import {PasswordValidator} from 'src/app/shared/validators/password.validator';
import {AvatarService} from 'src/app/shared/services/avatar/avatar.service';
import {LocalStorageService} from 'src/app/shared/storage/services/local-storage/local-storage.service';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss'],
})
export class DashboardFormComponent implements OnInit {
  changeUserDataForm!: FormGroup;
  newAvatar!: string;
  currentAvatar = this.userAvatar.avatar$.subscribe(
    (avatar) => (this.newAvatar = avatar)
  );

  constructor(
    private store$: Store,
    private authService: AuthService,
    private router: Router,
    private userAvatar: AvatarService,
    private localStorage: LocalStorageService
  ) {
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
    }, {updateOn: "blur"});
  }

  isFormValid() {
    return !(
      this.usernameControl?.value !== '' ||
      this.confirmPasswordControl?.value !== ''
    );
  }

  deleteUser() {
    this.authService.deleteUser().subscribe(() => {
      this.store$.dispatch(logoutSuccess());
      this.localStorage.clear();
      this.router.navigate(['auth'], {replaceUrl: true}).catch();
    });
  }

  changeUserAvatar() {
    this.authService.changeUserData({image: this.newAvatar}).subscribe(() => {
      this.store$.dispatch(logoutSuccess());
      this.localStorage.clear();
      this.router.navigate(['auth'], {replaceUrl: true}).catch();
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

    this.authService.changeUserData(userData).subscribe(() => {
      this.store$.dispatch(logoutSuccess());
      this.localStorage.clear();
      this.router.navigate(['auth'], {replaceUrl: true}).catch();
    });
  }
}
