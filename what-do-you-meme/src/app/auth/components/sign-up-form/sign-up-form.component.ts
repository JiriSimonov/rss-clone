import { AvatarService } from '../../../shared/services/avatar/avatar.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsernameValidator } from 'src/app/shared/validators/username.validator';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  signUpForm!: FormGroup;
  avatar!: string;
  currentAvatar = this.avatarService.avatar$.subscribe((avatar) => {
    this.avatar = avatar;
    this.cdr.markForCheck();
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private avatarService: AvatarService
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
        [UsernameValidator.isUniqueUsername(this.authService)],
      ),
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

  get userData() {
    return {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      image: this.avatar,
    };
  }

  onSubmit() {
    this.authService.signUp(this.userData).subscribe(() => {
      this.router.navigate(['lobbies'], { replaceUrl: true }).catch();
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

  get usernameControl() {
    return this.signUpForm.get('username');
  }

  get passwordControl() {
    return this.signUpForm.get('password');
  }

  get passwordConfirmControl() {
    return this.signUpForm.get('confirmPassword');
  }
}
